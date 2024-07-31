import styles from './JournalForm.module.css';
import { Button } from '../Button/Button.jsx';
import {useEffect, useState} from 'react';
import cn from 'classnames';

const INITIAL_STATE = {
	title: true,
	text: true,
	date: true
};

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState(INITIAL_STATE);

	useEffect(() => {
		let timerId;

		if (!formValidState.date || !formValidState.title || !formValidState.text) {
			setTimeout(() => {
				setFormValidState(INITIAL_STATE);
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData.entries());

		let isFormValid = true;

		if (!formProps.title?.trim().length) {
			setFormValidState((prevState) => ({ ...prevState, title: false }));
			isFormValid = false;
		} else {
			setFormValidState((prevState) => ({ ...prevState, title: true }));
		}

		if (!formProps.text?.trim().length) {
			setFormValidState((prevState) => ({ ...prevState, text: false }));
			isFormValid = false;
		} else {
			setFormValidState((prevState) => ({ ...prevState, text: true }));
		}

		if (!formProps.date) {
			setFormValidState((prevState) => ({ ...prevState, date: false }));
			isFormValid = false;
		} else {
			setFormValidState((prevState) => ({ ...prevState, date: true }));
		}

		if (!isFormValid) {
			return;
		}

		onSubmit(formProps);
		e.target.reset();
		setFormValidState({ title: true, text: true, date: true });

	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input
						type="text"
						name="title"
						className={cn(styles['journal-form__title'], {
							[styles['invalid']]: !formValidState.title
						})}
					/>
				</div>
				<div className={styles['journal-form__row']}>
					<label htmlFor="date" className={styles['journal-form__label']}>
						Дата
					</label>
					<input
						type="date"
						name="date"
						id="date"
						className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`}
					/>
				</div>
				<textarea
					name="text"
					cols="30"
					rows="10"
					className={`${styles['textarea']} ${formValidState.text ? '' : styles['invalid']}`}
				/>
				<Button text="Сохранить" isAccent />
			</form>
		</>
	);
}

export default JournalForm;

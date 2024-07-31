import styles from './JournalForm.module.css';
import { Button } from '../Button/Button.jsx';
import {useEffect, useReducer} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, isFormReadyToSubmit, values  } = formState;

	useEffect(() => {
		let timerId;

		if (!isValid.date || !isValid.title || !isValid.text) {
			setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData.entries());

		dispatchForm({ type: 'SUBMIT', payload: formProps });

		onSubmit(formProps);
	};

	const onChange = (e) => dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input
						type="text"
						name="title"
						className={cn(styles['journal-form__title'], {
							[styles['invalid']]: !isValid.title
						})}
						value={values.title}
						onChange={onChange}
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
						className={`${styles['input']} ${isValid.date ? '' : styles['invalid']}`}
						value={values.date}
						onChange={onChange}
					/>
				</div>
				<textarea
					name="text"
					cols="30"
					rows="10"
					className={`${styles['textarea']} ${isValid.text ? '' : styles['invalid']}`}
					value={values.text}
					onChange={onChange}
				/>
				<Button text="Сохранить" isAccent />
			</form>
		</>
	);
}

export default JournalForm;

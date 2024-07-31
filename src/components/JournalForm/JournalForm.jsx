import styles from './JournalForm.module.css';
import { Button } from '../Button/Button.jsx';
import {useEffect, useReducer, useRef} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, isFormReadyToSubmit, values  } = formState;

	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;

		if (!isValid.date || !isValid.title || !isValid.text) {
			focusError(isValid);
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
	}, [isFormReadyToSubmit, values, onSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
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
						ref={titleRef}
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
						ref={dateRef}
					/>
				</div>
				<textarea
					name="text"
					cols="30"
					rows="10"
					className={`${styles['textarea']} ${isValid.text ? '' : styles['invalid']}`}
					value={values.text}
					onChange={onChange}
					ref={textRef}
				/>
				<Button text="Сохранить" isAccent />
			</form>
		</>
	);
}

export default JournalForm;

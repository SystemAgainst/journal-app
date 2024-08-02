import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useContext, useEffect, useReducer, useRef} from 'react';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';

function JournalForm({ data, onSubmit, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, isFormReadyToSubmit, values  } = formState;

	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current?.focus();
			break;
		case !isValid.date:
			dateRef.current?.focus();
			break;
		case isValid.text:
			textRef.current?.focus();
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
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
	}, [data]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	useEffect(() => {
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });

	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['journal-form__row']}>
				<Input
					type="text"
					name="title"
					appearance="title"
					value={values.title}
					onChange={onChange}
					ref={titleRef}
					isValid={isValid.title}
				/>
				{data.id &&
					<button type="button" className={styles['journal-form__btn']} onClick={deleteJournalItem}>
						<img className={styles['journal-form__img']} src="/public/delete.svg" alt="remove icon"/>
					</button>
				}
			</div>
			<div className={styles['journal-form__row']}>
				<label htmlFor="date" className={styles['journal-form__label']}>
					Дата
				</label>
				<Input
					type="date"
					name="date"
					id="date"
					appearance="date"
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
					onChange={onChange}
					ref={dateRef}
					isValid={isValid.date}
				/>
			</div>
			<textarea
				name="text"
				cols="30"
				rows="10"
				className={`${styles['journal-form__textarea']} ${isValid.text ? '' : styles['journal-form_invalid']}`}
				value={values.text}
				onChange={onChange}
				ref={textRef}
			/>
			<Button text="Сохранить" isAccent/>
		</form>
	);
}

export default JournalForm;

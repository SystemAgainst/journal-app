import './JournalForm.css';
import { Button } from '../Button/Button.jsx';
import { useState } from 'react';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});

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
	};

	return (
		<>
			<form className="journal-form" onSubmit={addJournalItem}>
				<input
					type="text"
					name="title"
					className={`input ${formValidState.title ? '' : 'invalid'}`}
				/>
				<input
					type="date"
					name="date"
					className={`input ${formValidState.date ? '' : 'invalid'}`}
				/>
				<textarea
					name="text"
					cols="30"
					rows="10"
					className={`input ${formValidState.text ? '' : 'invalid'}`}
				/>
				<Button text="Сохранить" />
			</form>
		</>
	);
}

export default JournalForm;

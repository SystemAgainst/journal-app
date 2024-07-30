import './JournalForm.css';
import {useState} from 'react';
import {Button} from '../Button/Button.jsx';

function JournalForm() {
	let [inputeData, setInputeData] = useState('1');

	const inputHandle = (event) => {
		setInputeData(event.target.value);
		console.log(inputeData);
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		inputeData = 2;
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
	};
    
	return (
		<>
			<form className="journal-form" onSubmit={addJournalItem}>
				{inputeData}
				<input type="text" name="title" />
				<input type="date" name="date" />
				<input type="text" name="tag" value={inputeData} onChange={inputHandle}/>
				<textarea name="post" id="" cols="30" rows="10"></textarea>
				<Button text="Сохранить" />
			</form>
		</>
	);
}

export default JournalForm;

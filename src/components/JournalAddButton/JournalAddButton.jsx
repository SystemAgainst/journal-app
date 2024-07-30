import './JournalAddButton.css';
import CardButton from '../CardButton/CardButton.jsx';

function JournalAddButton() {
	return (
		<CardButton className="journal-add">
			<b>+</b> Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;

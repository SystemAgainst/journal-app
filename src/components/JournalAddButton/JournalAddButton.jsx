import styles from './JournalAddButton.module.css';
import CardButton from '../CardButton/CardButton.jsx';

function JournalAddButton({ clearForm }) {
	return (
		<CardButton className={styles['journal-add']} onClick={clearForm}>
			<b>+</b> Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;

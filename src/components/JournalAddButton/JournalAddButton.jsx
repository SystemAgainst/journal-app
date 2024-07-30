import styles from './JournalAddButton.module.css';
import CardButton from '../CardButton/CardButton.jsx';

function JournalAddButton() {
	return (
		<CardButton className={styles['journal-add']}>
			<b>+</b> Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;

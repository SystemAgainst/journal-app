import styles from './JournalItem.module.css';

function JournalItem({ title, date, text }) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<div className={styles['journal-item']}>
			<h2 className={styles['journal-item__header']}>{title}</h2>
			<h2 className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{formatedDate}</div>
				<div className={styles['journal-item__date']}>{text}</div>
			</h2>
		</div>

	);
}

export default JournalItem;

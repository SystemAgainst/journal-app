import style from './JournalList.module.css';

function JournalList({ children }) {
	return (
		<div className={style['journal-list']}>
			{children}
		</div>

	);
}

export default JournalList;

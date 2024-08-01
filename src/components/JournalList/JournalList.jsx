import style from './JournalList.module.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';

function JournalList({ items }) {
	if (!items || items.length === 0) {
		return <p>Записей пока нет. Добавьте новую запись</p>;
	}

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		}

		return -1;
	};
	
	return (
		<div className={style['journal-list']}>
			{items.sort(sortItems).map((item) => (
				<CardButton key={item.id}>
					<JournalItem
						title={item.title}
						text={item.text}
						date={item.date}
					/>
				</CardButton>
			))}
		</div>
	);
}

export default JournalList;

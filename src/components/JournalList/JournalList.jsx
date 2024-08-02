import style from './JournalList.module.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context.jsx';

function JournalList({ items }) {
	const { userId } = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		}

		return -1;
	};

	const filteredItems = useMemo(() => {
		return items
			.filter((el) => el.userId === userId)
			.sort(sortItems);
	}, [items, userId]);

	if (!items || items.length === 0) {
		return <p>Записей пока нет. Добавьте новую запись</p>;
	}
	
	return (
		<div className={style['journal-list']}>
			{filteredItems
				.map((item) => (
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

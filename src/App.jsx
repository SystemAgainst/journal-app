import { wrapper } from './App.module.css';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useEffect, useState} from 'react';

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const dataFromLocalStorage = JSON.parse(localStorage.getItem('data'));

		if (dataFromLocalStorage) {
			setData(dataFromLocalStorage.map((journal) => ({
				...journal,
				date: new Date(journal.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (data.length) {
			localStorage.setItem('data', JSON.stringify(data));
		}
	}, [data]);

	const addItem = (item) => {
		setData((prev) => [
			...prev,
			{
				title: item.title,
				text: item.text,
				date: new Date(item.date),
				id: +prev.length + 1
			}
		]);
	};

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		}

		return -1;
	};

	return (
		<div className={wrapper}>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{ data.length === 0 && <p>Записей пока нет. Добавьте новую запись</p> }
					{
						data.length > 0 && data.sort(sortItems).map((item) => (
							<CardButton key={item.id}>
								<JournalItem
									title={item.title}
									text={item.text}
									date={item.date}
								/>
							</CardButton>
						))
					}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;

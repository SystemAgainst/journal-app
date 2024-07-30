import './App.css';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useState} from 'react';

function App() {
	const INITIAL_DATA = [
		{
			id: 1,
			title: 'Journal Item',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, sunt!',
			date: new Date()
		},
		{
			id: 2,
			title: 'Подготовка к обновлению курса',
			text: 'Lorem ipsum dolor sit amet',
			date: new Date()
		}
	];

	const [data, setData] = useState(INITIAL_DATA);

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
		<div className="app">
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

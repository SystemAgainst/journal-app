import './App.css';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';

function App() {
	const data = [
		{
			title: 'Journal Item',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, sunt!',
			date: new Date()
		},
		{
			title: 'Подготовка к обновлению курса',
			text: 'Lorem ipsum dolor sit amet',
			date: new Date()
		}
	];

	return (
		<div className="app">
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{
						data.map((item, idx) => (
							<CardButton key={idx}>
								<JournalItem 
									item={item}
									title={item.title}
									text={item.text}
									date={item.date}
								/>
							</CardButton>
						))
					};
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm/>
			</Body>
		</div>
	);
}

export default App;

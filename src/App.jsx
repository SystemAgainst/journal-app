import { wrapper } from './App.module.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useLocaleStorageHook} from './hooks/useLocaleStorage.hook.js';
import {UserContext} from './context/user.context.js';

function mapItems (items){
	if (!items) {
		return [];
	}
	
	return items.map((i) => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [data, setData] = useLocaleStorageHook('data');

	const addItem = (item) => {
		setData([...mapItems(data), {
			title: item.title,
			text: item.text,
			date: new Date(item.date),
			id: +data.length + 1
		}]);
	};

	return (
		<UserContext.Provider value={{ userId: 1 }}>
			<div className={wrapper}>
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(data)}/>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem}/>
				</Body>
			</div>
		</UserContext.Provider>
	);
}

export default App;

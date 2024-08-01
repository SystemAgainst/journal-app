import { wrapper } from './App.module.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useLocaleStorageHook } from './hooks/useLocaleStorage.hook.js';
import { UserContextProvider } from './context/user.context.jsx';

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
	console.log('App');

	const [data, setData] = useLocaleStorageHook('data');

	const addItem = (item) => {
		setData([...mapItems(data), {
			...item,
			date: new Date(item.date),
			id: +data.length + 1
		}]);
	};

	return (
		<UserContextProvider>
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
		</UserContextProvider>
	);
}

export default App;

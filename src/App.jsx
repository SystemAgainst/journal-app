import { wrapper } from './App.module.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useLocaleStorageHook } from './hooks/useLocaleStorage.hook.js';
import { UserContextProvider } from './context/user.context.jsx';
import {useState} from 'react';

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
	const [selectedItem, setSelectedItem] = useState({});

	const addItem = (item) => {
		if (!item.id) {
			setData([...mapItems(data), {
				...item,
				date: new Date(item.date),
				id: +data.length + 1
			}]);
		} else {
			setData([...mapItems(data).map(i => {
				if (i.id === item.id) {
					return {...item};
				}

				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setData([...mapItems(data).filter((i) => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className={wrapper}>
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(data)} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} data={selectedItem} onDelete={deleteItem} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;

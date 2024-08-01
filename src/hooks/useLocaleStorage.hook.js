import { useEffect, useState } from 'react';

export function useLocaleStorageHook(key) {
	const [data, setData] = useState(null);

	useEffect(() => {
		const dataFromLocalStorage = JSON.parse(localStorage.getItem(key));

		if (dataFromLocalStorage) {
			setData(dataFromLocalStorage);
		}
	}, []);

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};
    
	return [data, saveData];
}
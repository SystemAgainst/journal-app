import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser.jsx';
import {useState} from 'react';
import {Button} from '../Button/Button.jsx';

const LOGO_LIST = ['vite.svg', 'cloud-rain.svg'];


function Header() {
	const [logoIdx, setLogoIdx] = useState(0);

	const toggleLogo = () => {
		setLogoIdx((prev) => Number(!prev));
	};

	return (
		<>
			<img className={styles['logo']} src={LOGO_LIST[logoIdx]} alt="logo"/>
			<SelectUser />
			<Button isAccent onClick={toggleLogo}>Изменить логотип</Button>
		</>
	);
}

export default Header;

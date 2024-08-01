import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser.jsx';

function Header() {
	return (
		<>
			<img className={styles['logo']} src="/vite.svg" alt="logo"/>
			<SelectUser />
		</>
	);
}

export default Header;

import styles from './Header.module.css';

function Header() {
	return (
		<img className={styles['logo']} src="/vite.svg" alt="logo"/>
	);
}

export default Header;

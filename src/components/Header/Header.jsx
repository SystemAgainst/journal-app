import SelectUser from '../SelectUser/SelectUser.jsx';
import { useState } from 'react';
import Logo from '../Logo/Logo.jsx';
import Button from '../Button/Button.jsx';

const LOGO_LIST = ['vite.svg', 'cloud-rain.svg'];


function Header() {
	const [logoIdx, setLogoIdx] = useState(0);

	const toggleLogo = () => {
		setLogoIdx((prev) => Number(!prev));
	};

	return (
		<>
			<Logo image={LOGO_LIST[logoIdx]} />
			<SelectUser />
			<Button isAccent onClick={toggleLogo}>Изменить логотип</Button>
		</>
	);
}

export default Header;

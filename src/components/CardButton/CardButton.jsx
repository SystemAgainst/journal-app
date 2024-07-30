import './CardButton.css';

function CardButton({ children, className }) {
	const newClass = 'card-button ' + (className || '');
	return (
		<button className={newClass}>
			{children}
		</button>
	);
}

export default CardButton;

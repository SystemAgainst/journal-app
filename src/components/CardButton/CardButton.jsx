import style from './CardButton.module.css';
import cn from 'classnames';

function CardButton({ children, className }) {
	const newClass = 'card-button ' + (className || '');
	return (
		<button className={cn(newClass, style['card-button'])}>
			{children}
		</button>
	);
}

export default CardButton;

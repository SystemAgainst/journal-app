import style from './CardButton.module.css';
import cn from 'classnames';

function CardButton({ children, className, ...props }) {
	const newClass = 'card-button ' + (className || '');
	return (
		<button {...props} className={cn(newClass, style['card-button'])}>
			{children}
		</button>
	);
}

export default CardButton;

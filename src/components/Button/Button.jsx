import style from './Button.module.css';
import cn from 'classnames';


export function Button({ text, onClick, isAccent }) {
	return (
		<button
			className={cn(style.button, {[style.accent]: isAccent})}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
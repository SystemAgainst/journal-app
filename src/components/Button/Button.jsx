import style from './Button.module.css';
import cn from 'classnames';


export function Button({ children = 'Сохранить', onClick, isAccent }) {
	return (
		<button
			className={cn(style.button, {[style.accent]: isAccent})}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
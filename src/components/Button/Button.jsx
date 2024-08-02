import style from './Button.module.css';
import cn from 'classnames';
import {memo} from 'react';

function Button({ children = 'Сохранить', onClick, isAccent }) {
	return (
		<button
			className={cn(style.button, {[style.accent]: isAccent})}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default memo(Button);
import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className, isValid, appearance, ...rest }, ref) {
	return (
		<input
			{...rest}
			ref={ref}
			className={cn(styles['ui-input'], className, {
				[styles['ui-input_invalid']]: !isValid,
				[styles['ui-input__title']]: appearance === 'title'
			})}
		/>
	);
});

export default Input;

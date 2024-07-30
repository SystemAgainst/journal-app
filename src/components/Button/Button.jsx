import style from './Button.module.css';

export function Button({ text, onClick }) {
	return (
		<button className={style['button accent']} onClick={onClick}>
			{text}
		</button>
	);
}
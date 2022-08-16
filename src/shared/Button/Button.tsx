import './Button.scss';

interface ButtonValues {
	buttonClass: string;
	children: string;
	handleClick?: () => void;
}

const Button = ({ buttonClass, children, handleClick }: ButtonValues) => {
	return (
		<button onClick={handleClick} className={buttonClass} type='button'>
			{children}
		</button>
	);
};

export default Button;

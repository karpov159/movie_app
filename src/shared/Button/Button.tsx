import './Button.scss';

interface ButtonValues {
	buttonClass: string;
	children: string;
}

const Button = ({ buttonClass, children }: ButtonValues) => {
	return (
		<button className={buttonClass} type='button'>
			{children}
		</button>
	);
};

export default Button;

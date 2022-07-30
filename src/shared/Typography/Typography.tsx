import { ElementType } from 'react';
import './Typography.scss';

interface TypographyValues {
	addClass?: string;
	component?: ElementType;
	children: string;
}

const Typography = ({ addClass, component, children }: TypographyValues) => {
	const classes = addClass ? 'title ' + addClass : 'title';
	const Component = component || 'h1';

	return <Component className={classes}>{children}</Component>;
};

export default Typography;

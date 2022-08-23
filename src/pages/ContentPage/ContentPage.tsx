import './ContentPage.scss';

interface ContentData {
	directory: string;
	title: string;
	render: (directory: string, title: string) => JSX.Element;
}

const ContentPage = ({ directory, title, render }: ContentData) => {
	return <div className='content-page'>{render(directory, title)}</div>;
};

export default ContentPage;

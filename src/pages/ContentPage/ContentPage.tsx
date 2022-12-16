import { useEffect } from 'react';
import { useAppDispatch } from '../../core/store';
import { changeCurrentTab } from '../../core/store/MoviesSlice';
import './ContentPage.scss';

interface ContentData {
	directory: string;
	title: string;
	render: (directory: string, title: string) => JSX.Element;
}

const ContentPage = ({ directory, title, render }: ContentData) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(changeCurrentTab(title));
	});

	return <div className='content-page'>{render(directory, title)}</div>;
};

export default ContentPage;

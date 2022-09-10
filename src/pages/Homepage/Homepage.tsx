import { Outlet } from 'react-router-dom';
import { useEffect, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '../../core/store';
import { setGenres, fetchGenres } from '../../core/store/MoviesSlice';
import ReactDOM from 'react-dom';
import AddMessage from '../../shared/AddMessage/AddMessage';
import Header from '../../components/Header/Header';
import Genres from '../../components/Genres/Genres';

import './Homepage.scss';

const Homepage = () => {
	const dispatch = useAppDispatch();
	const genresDirectory = 'genre/movie/list?sort_by=popularity.desc&';
	const isShowedMessage = useAppSelector(
		(state) => state.movies.isShowedMessage
	);
	useEffect(() => {
		dispatch(fetchGenres(genresDirectory)).then((res) => {
			const genresObj: Record<number, string> = {};
			const genres = res.payload.genres;

			for (let key of genres) {
				genresObj[key.id] = key.name;
			}

			dispatch(setGenres(genresObj));
		});
	}, [dispatch]);

	const message = isShowedMessage ? (
		<Portal>
			<AddMessage message='The movie was added to your list' />
		</Portal>
	) : null;

	return (
		<>
			<div className='homepage'>
				<Header />
				<Genres />
				<Outlet />
				{message}
			</div>
		</>
	);
};

const Portal = ({ children }: { children: ReactNode }) => {
	const node = document.createElement('div');
	document.body.appendChild(node);

	return ReactDOM.createPortal(children, node);
};

export default Homepage;

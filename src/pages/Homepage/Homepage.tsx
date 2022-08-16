import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../core/store';
import { setGenres, fetchGenres } from '../../core/store/MoviesSlice';
import Header from '../../components/Header/Header';
import Genres from '../../components/Genres/Genres';

const Homepage = () => {
	const dispatch = useAppDispatch();
	const genresDirectory = 'genre/movie/list?sort_by=popularity.desc&';

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

	return (
		<>
			<Header />
			<Genres />
			<Outlet />
		</>
	);
};

export default Homepage;

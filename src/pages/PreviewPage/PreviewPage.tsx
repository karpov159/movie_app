import { useEffect } from 'react';
import { fetchMovies } from '../../core/store/MoviesSlice';
import { useAppDispatch, useAppSelector } from '../../core/store';
import { selectAll } from '../../core/store/MoviesSlice';
import { store } from '../../core/store';
import Typography from '../../shared/Typography/Typography';
import MovieInfo from '../../shared/interfaces/movie.interface';
import Button from '../../shared/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';

import './PreviewPage.scss';

const PreviewPage = () => {
	const moviesLoadingStatus = useAppSelector(
		(state) => state.movies.moviesLoadingStatus
	);
	const dispatch = useAppDispatch();
	const allMovies = selectAll(store.getState());

	useEffect(() => {
		dispatch(fetchMovies());
	}, [dispatch]);

	const renderMovies = (allMovies: any[]) => {
		return allMovies.map((movie: MovieInfo) => {
			return <MovieCard key={movie.id} {...movie} />;
		});
	};

	const moviesCards = renderMovies(allMovies);

	return (
		<div className='preview-page'>
			<div className='preview-page__headline'>
				<Typography component='h2' children='Popular movies' />
				<Button children='Next >' buttonClass='next-button' />
			</div>

			<div className='preview-page__movies'>{moviesCards}</div>
		</div>
	);
};

export default PreviewPage;

import { useEffect } from 'react';
import { fetchMovies } from '../../core/store/MoviesSlice';
import { BASE_URL, API_KEY } from '../../helpers/constants';
import { selectAll } from '../../core/store/MoviesSlice';
import { store } from '../../core/store';
import { useAppSelector, useAppDispatch } from '../../core/store';
import MovieCard from './MovieCard/MovieCard';
import Spinner from '../../shared/Spinner/Spinner';
import Error from '../../shared/Error/Error';
import MovieData from '../../shared/interfaces/movie.interface';
import Headline from '../../shared/Headline/Headline';

interface MoviesProps {
	directory: string;
	title: string;
}

const MoviesCards = ({ directory, title }: MoviesProps) => {
	const currentPage = useAppSelector((state) => state.movies.currentPage);
	const allMovies = selectAll(store.getState());
	const moviesLoadingStatus = useAppSelector(
		(state) => state.movies.moviesLoadingStatus
	);
	const activeGenre = useAppSelector((state) => state.movies.activeGenre);
	const searchField = useAppSelector((state) => state.movies.searchField);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (activeGenre.num && !searchField) {
			const url = `${BASE_URL}discover/movie?${API_KEY}&with_genres=${activeGenre.num}&sort_by=vote_count.desc&vote_count.gte=10&page=${currentPage}`;

			dispatch(fetchMovies(url));
		}

		if (searchField) {
			const url = `${BASE_URL}search/movie/?${API_KEY}&query=${searchField}&page=${currentPage}`;

			dispatch(fetchMovies(url));
		}
		if (!searchField && !activeGenre.num) {
			dispatch(fetchMovies(directory + currentPage));
		}
	}, [dispatch, currentPage, directory, activeGenre, searchField]);

	const renderMovies = (allMovies: MovieData[]) => {
		return allMovies.map((movie: MovieData) => {
			return <MovieCard key={movie.id} {...movie} />;
		});
	};

	const spinner = moviesLoadingStatus === 'loading' ? <Spinner /> : null;

	const error = moviesLoadingStatus === 'error' ? <Error /> : null;

	const moviesCards =
		moviesLoadingStatus === 'idle' ? renderMovies(allMovies) : null;

	return (
		<>
			<Headline>{title}</Headline>

			{error}

			{spinner}

			<div className='content-page__movies'>{moviesCards}</div>
		</>
	);
};

export default MoviesCards;

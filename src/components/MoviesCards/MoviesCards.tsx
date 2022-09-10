import { useEffect, useState, useCallback } from 'react';
import { fetchMovies, changeCurrentPage } from '../../core/store/MoviesSlice';
import { BASE_URL, API_KEY } from '../../helpers/constants';
import { selectAll } from '../../core/store/MoviesSlice';
import { store } from '../../core/store';
import { useAppSelector, useAppDispatch } from '../../core/store';
import MovieCard from './MovieCard/MovieCard';
import MovieInfo from '../../shared/interfaces/movie.interface';
import Spinner from '../../shared/Spinner/Spinner';
import Typography from '../../shared/Typography/Typography';
import Button from '../../shared/Button/Button';

interface ActiveGenre {
	name: string;
	num: number | null;
}

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
	const activeGenre: ActiveGenre = useAppSelector(
		(state) => state.movies.activeGenre
	);
	const searchField = useAppSelector((state) => state.movies.searchField);
	const dispatch = useAppDispatch();
	// const [, updateState] = useState({});
	// const forceUpdate = useCallback(() => updateState({}), []);

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

	const clickNextPage = () => {
		dispatch(changeCurrentPage(currentPage + 1));
	};

	const clickPreviousPage = () => {
		dispatch(changeCurrentPage(currentPage - 1));
	};

	const previousButton =
		currentPage > 1 ? (
			<Button
				handleClick={clickPreviousPage}
				children='< Previous'
				buttonClass='page-button page-button_mr'
			/>
		) : null;

	const renderMovies = (allMovies: any[]) => {
		return allMovies.map((movie: MovieInfo) => {
			return <MovieCard key={movie.id} {...movie} />;
		});
	};
	const spinner = moviesLoadingStatus === 'loading' ? <Spinner /> : null;

	const moviesCards =
		moviesLoadingStatus === 'idle' ? renderMovies(allMovies) : null;

	return (
		<>
			<div className='content-page__headline'>
				<Typography component='h2' children={title} />
				<div className='content-page__buttons'>
					{previousButton}
					<Button
						handleClick={clickNextPage}
						children='Next >'
						buttonClass='page-button'
					/>
				</div>
			</div>
			<div className='content-page__movies'>{moviesCards}</div>
			{spinner}
		</>
	);
};

export default MoviesCards;

import { useEffect } from 'react';
import { fetchMovies, changeCurrentPage } from '../../core/store/MoviesSlice';
import { useAppDispatch, useAppSelector } from '../../core/store';
import { selectAll } from '../../core/store/MoviesSlice';
import { store } from '../../core/store';
import Spinner from '../../shared/Spinner/Spinner.jsx';
import Typography from '../../shared/Typography/Typography';
import MovieInfo from '../../shared/interfaces/movie.interface';
import Button from '../../shared/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import { BASE_URL, API_KEY } from '../../helpers/constants';

import './ContentPage.scss';

interface ContentData {
	directory: string;
	title: string;
}

interface ActiveGenre {
	name: string;
	num: number | null;
}

const ContentPage = ({ directory, title }: ContentData) => {
	const currentPage = useAppSelector((state) => state.movies.currentPage);
	const moviesLoadingStatus = useAppSelector(
		(state) => state.movies.moviesLoadingStatus
	);
	const activeGenre: ActiveGenre = useAppSelector(
		(state) => state.movies.activeGenre
	);
	const dispatch = useAppDispatch();
	const allMovies = selectAll(store.getState());

	useEffect(() => {
		if (activeGenre.num) {
			const url = `${BASE_URL}discover/movie?${API_KEY}&with_genres=${activeGenre.num}&sort_by=vote_count.desc&vote_count.gte=10&page=${currentPage}`;

			dispatch(fetchMovies(url));
		} else {
			dispatch(fetchMovies(directory + currentPage));
		}
	}, [dispatch, currentPage, directory, activeGenre]);

	const renderMovies = (allMovies: any[]) => {
		return allMovies.map((movie: MovieInfo) => {
			return <MovieCard key={movie.id} {...movie} />;
		});
	};

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
	const spinner = moviesLoadingStatus === 'loading' ? <Spinner /> : null;
	const moviesCards =
		moviesLoadingStatus === 'idle' ? renderMovies(allMovies) : null;

	return (
		<div className='preview-page'>
			<div className='preview-page__headline'>
				<Typography component='h2' children={title} />
				<div className='preview-page__buttons'>
					{previousButton}
					<Button
						handleClick={clickNextPage}
						children='Next >'
						buttonClass='page-button'
					/>
				</div>
			</div>
			{spinner}
			<div className='preview-page__movies'>{moviesCards}</div>
		</div>
	);
};

export default ContentPage;

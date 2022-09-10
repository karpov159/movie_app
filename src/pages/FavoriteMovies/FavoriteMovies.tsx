import { useEffect, useState } from 'react';
import { favMoviesLocalStorage } from '../../core/LocalStorage/favMoviesLocalStorage';
import { BASE } from '../../core/config/RoutesConfig';
import { NavLink } from 'react-router-dom';
import MovieCard from '../../components/MoviesCards/MovieCard/MovieCard';
import Typography from '../../shared/Typography/Typography';
import Arrows from '../../shared/Arrows/Arrows';

import './FavoriteMovies.scss';

interface FavoriteMoviesData {
	title: string;
}

const FavoriteMovies = ({ title }: FavoriteMoviesData) => {
	const [movies, setMovies] = useState({});
	const [isLoaded, setLoaded] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const favMovies = favMoviesLocalStorage.getItem();

		setLoaded(true);
		setMovies(favMovies);
	}, []);

	const renderMovies = (movies: object) => {
		const arr = Object.values(movies).slice(currentPage, currentPage + 12);

		return arr.map((movie) => {
			return (
				<MovieCard
					key={movie.id}
					deleteMovie={deleteMovie}
					page='favorite'
					{...movie}
				/>
			);
		});
	};

	const deleteMovie = (movie: string) => {
		const moviesObj: Record<string, string | number> = { ...movies };

		delete moviesObj[movie];

		setMovies(moviesObj);
	};

	const clickNextPage = () => {
		setCurrentPage((currentPage) => currentPage + 12);
	};

	const clickPreviousPage = () => {
		setCurrentPage((currentPage) => currentPage - 12);
	};

	const length = isLoaded ? Object.values(movies).length : 0;
	const content = isLoaded ? renderMovies(movies) : null;
	const isNextArrowShowed = currentPage + 12 < length ? true : false;

	return (
		<>
			<div className='favorite-movies'>
				<NavLink to={BASE.PATH} className='favorite-movies__button'>
					Homepage
				</NavLink>
				<div className='favorite-movies__header'>
					<Typography component='h2' children={title} />
					<Arrows
						currentPage={currentPage}
						onNextPage={clickNextPage}
						onPreviousPage={clickPreviousPage}
						isNextArrowShowed={isNextArrowShowed}
					/>
				</div>
				<div className='favorite-movies__content'>{content}</div>
			</div>
		</>
	);
};

export default FavoriteMovies;

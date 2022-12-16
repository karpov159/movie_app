import { useState } from 'react';
import { useAppSelector } from '../../../core/store';
import MoviePreview from './MoviePreview/MoviePreview';
import MovieOverview from './MovieOverview/MovieOverview';
import MovieInfo from '../../../shared/interfaces/movie.interface';

import './MovieCard.scss';

const MovieCard = ({
	backdrop_path,
	poster_path,
	title,
	release_date,
	vote_average,
	overview,
	genre_ids,
	name,
	id,
	first_air_date,
}: MovieInfo) => {
	const [isOpenedOverview, setOpenedOverview] = useState(false);
	const genresData = useAppSelector((state) => state.movies.genresData);

	const toggleClick = (boolean: boolean) => {
		setOpenedOverview(boolean);

		if (boolean) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	};

	const genres = genre_ids.map((num: number) =>
		genresData[num] ? genresData[num] + ' ' : ''
	);

	return (
		<div className='movie'>
			<MoviePreview
				toggleClick={toggleClick}
				poster_path={poster_path}
				title={title}
				genres={genres}
				vote_average={vote_average}
				name={name}
			/>

			{isOpenedOverview ? (
				<MovieOverview
					toggleClick={toggleClick}
					poster_path={poster_path}
					backdrop_path={backdrop_path}
					genre_ids={genre_ids}
					name={name}
					release_date={release_date}
					overview={overview}
					title={title}
					vote_average={vote_average}
					id={id}
					first_air_date={first_air_date}
				/>
			) : null}
		</div>
	);
};

export default MovieCard;

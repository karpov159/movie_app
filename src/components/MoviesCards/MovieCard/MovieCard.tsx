import { useState } from 'react';
import { useAppSelector } from '../../../core/store';
import MoviePreview from '../MoviePreview';
import MovieOverview from '../MovieOverview';
import MovieInfo from '../../../shared/interfaces/movie.interface';

import './MovieCard.scss';

interface MovieAdditionalInfo extends MovieInfo {
	deleteMovie?: ((n: string) => void) | undefined;
	page?: string | undefined;
}

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
	deleteMovie,
	first_air_date,
	page = 'Default',
}: MovieAdditionalInfo) => {
	const [isOpenedOverview, setOpenedOverview] = useState(false);
	const genresData: Record<number, string> = useAppSelector(
		(state) => state.movies.genresData
	);

	const handleClick = (boolean: boolean) => {
		return () => {
			setOpenedOverview(boolean);

			if (boolean) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		};
	};

	const genres = genre_ids.map((num: number, i: number) => {
		return genresData[num] ? genresData[num] + ' ' : '';
	});

	return (
		<div className='movie'>
			<MoviePreview
				handleClick={handleClick}
				poster_path={poster_path}
				title={title}
				genres={genres}
				vote_average={vote_average}
				name={name}
			/>

			{isOpenedOverview ? (
				<MovieOverview
					handleClick={handleClick}
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
					deleteMovie={deleteMovie}
					page={page}
				/>
			) : null}
		</div>
	);
};

export default MovieCard;

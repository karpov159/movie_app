import {
	setActiveGenre,
	changeCurrentPage,
	changeSearchField,
} from '../../core/store/MoviesSlice';
import { useAppDispatch, useAppSelector } from '../../core/store';
import Genre from './Genre';
import Typography from '../../shared/Typography/Typography';
import getRandomColor from '../../helpers/getRandomColor';

import './Genres.scss';

const Genres = () => {
	const dispatch = useAppDispatch();
	const genresData: Record<number, string> = useAppSelector(
		(state) => state.movies.genresData
	);

	const handleClick = (name: string, num: string) => {
		dispatch(setActiveGenre({ name, num }));
		dispatch(changeCurrentPage(1));
		dispatch(changeSearchField(''));
	};

	const createButtons = (genres: Record<number, string>) => {
		const arr = [];

		for (let key in genres) {
			const genre = (
				<Genre
					key={key}
					genre={genresData[key]}
					color={getRandomColor()}
					handleClick={() => handleClick(genres[key], key)}
				/>
			);

			arr.push(genre);
		}

		return arr;
	};

	const genresButtons = createButtons(genresData);

	return (
		<div className='genres'>
			<Typography component='h2' children='All genres' />
			<div className='genres__list'>{genresButtons}</div>
		</div>
	);
};

export default Genres;

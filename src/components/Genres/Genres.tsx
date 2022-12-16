import {
	setActiveGenre,
	changeCurrentPage,
	changeSearchField,
	changeCurrentTab,
} from '../../core/store/MoviesSlice';
import { useAppDispatch, useAppSelector } from '../../core/store';
import { BASE } from '../../core/config/RoutesConfig';
import { useNavigate } from 'react-router-dom';
import Genre from './Genre';
import Typography from '../../shared/Typography/Typography';

import './Genres.scss';

const Genres = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const genresData: Record<number, string> = useAppSelector(
		(state) => state.movies.genresData
	);

	const handleClick = (name: string, num: string) => {
		return (): void => {
			dispatch(setActiveGenre({ name, num }));
			dispatch(changeCurrentPage(1));
			dispatch(changeSearchField(''));
			dispatch(changeCurrentTab(''));
			navigate(BASE.PATH);
		};
	};

	const createButtons = (genres: Record<number, string>) => {
		const arr = [];

		for (let key in genres) {
			const genre = (
				<Genre
					key={key}
					genre={genresData[key]}
					handleClick={handleClick(genres[key], key)}
				/>
			);

			arr.push(genre);
		}

		return arr;
	};

	const genresButtons = createButtons(genresData);

	return (
		<div className='genres'>
			<Typography component='h2'>All genres</Typography>

			<div className='genres__list'>{genresButtons}</div>
		</div>
	);
};

export default Genres;

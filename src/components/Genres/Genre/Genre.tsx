import { useAppSelector } from '../../../core/store';
import { useMemo } from 'react';
import getRandomColor from '../../../helpers/getRandomColor';

interface GenreValues {
	genre: string;
	handleClick: () => void;
}

const Genre = ({ genre, handleClick }: GenreValues) => {
	const activeGenre = useAppSelector((state) => state.movies.activeGenre);
	const classes =
		activeGenre.name === genre
			? 'genres__genre genres__genre_active'
			: 'genres__genre';

	const getColor = useMemo(() => getRandomColor(), []);

	return (
		<button
			onClick={handleClick}
			style={{ backgroundColor: getColor }}
			className={classes}
			type='button'>
			{genre}
		</button>
	);
};

export default Genre;

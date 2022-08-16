import { useAppSelector } from '../../core/store';

interface GenreValues {
	genre: string;
	color?: string;
	handleClick: () => void;
}

const Genre = ({ genre, color = '', handleClick }: GenreValues) => {
	const activeGenre = useAppSelector((state) => state.movies.activeGenre);
	const classes =
		activeGenre.name === genre
			? 'genres__genre genres__genre_active'
			: 'genres__genre';

	return (
		<button
			onClick={handleClick}
			style={{ backgroundColor: color }}
			className={classes}
			type='button'>
			{genre}
		</button>
	);
};

export default Genre;

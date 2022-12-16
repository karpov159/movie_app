import { IMG_PATH } from '../../../../helpers/constants';
import { PlayIcon, StarIcon } from '../../../Icons';

interface MoviePreviewValues {
	title: string;
	poster_path: string;
	genres: string[];
	vote_average: number;
	toggleClick: (boolean: boolean) => void;
	name?: string;
}

const MoviePreview = ({
	title,
	poster_path,
	genres,
	vote_average,
	toggleClick,
	name,
}: MoviePreviewValues) => {
	const handleClick = () => {
		toggleClick(true);
	};

	return (
		<div className='movie__preview'>
			<img
				onClick={handleClick}
				src={IMG_PATH + poster_path}
				alt={title}
				className='movie__preview-img'
			/>

			<div className='movie__preview-menu'>
				<button onClick={handleClick} className='movie__preview-btn'>
					<div className='movie__preview-play'>
						<PlayIcon />
					</div>
				</button>

				<div className='movie__preview-name'>
					<div className='movie__preview-title'>{title || name}</div>
					<div className='movie__preview-genre'>{genres}</div>
				</div>

				<hr />

				<div className='movie__preview-rating'>
					<div className='movie__preview-star'>
						<StarIcon />
					</div>
					<div className='movie__preview-rate'>{vote_average}</div>
				</div>
			</div>
		</div>
	);
};

export default MoviePreview;

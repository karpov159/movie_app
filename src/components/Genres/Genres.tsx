import Typography from '../../shared/Typography/Typography';

import './Genres.scss';

const Genres = () => {
	return (
		<div className='genres'>
			<Typography component='h2' children='Favorite genres' />
			<div className='genres__list'>
				<button className='genres__genre'>Action</button>
				<button className='genres__genre'>Western</button>
				<button className='genres__genre'>Adventure</button>
				<button className='genres__genre'>Drama</button>
				<button className='genres__genre'>Comedy</button>
				<button className='genres__genre'>Science Fiction</button>
			</div>
		</div>
	);
};

export default Genres;

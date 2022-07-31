import { ChangeEvent, useEffect, useRef } from 'react';

interface MovieOverviewValues {
	title: string;
	backdrop_path: string;
	vote_average: number;
	release_date: string;
	overview: string;
	handleClick: (boolean: boolean) => void;
}

const MovieOverview = ({
	backdrop_path,
	title,
	vote_average,
	release_date,
	overview,
	handleClick,
}: MovieOverviewValues) => {
	const imgPath = 'https://image.tmdb.org/t/p/w1280';
	const overlay = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clickListener = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (
				overlay.current &&
				target.classList.contains('movie__overview')
			) {
				handleClick(false);
			}
		};

		document.addEventListener('click', clickListener);
		return () => {
			document.removeEventListener('click', clickListener);
		};
	}, [overlay, handleClick]);

	return (
		<div ref={overlay} className='movie__overview'>
			<div className='movie__overview-wrapper'>
				<div
					onClick={() => handleClick(false)}
					className='movie__overview-close'>
					&times;
				</div>
				<div className='movie__overview-img'>
					<img src={imgPath + backdrop_path} alt={title} />
				</div>
				<div className='movie__overview-title'>{title}</div>
				<div className='movie__overview-rating'>
					<a href='#' className='movie__overview-star'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 576 512'>
							<path d='M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z' />
						</svg>
					</a>
					<div className='movie__overview-rate'>{vote_average}</div>
					<div className='movie__overview-date'>{release_date}</div>
				</div>
				<div className='movie__overview-descr'>{overview}</div>
				<div className='movie__overview-btns'>
					<button className='movie__overview-play'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 384 512'>
							<path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
						</svg>
						Play
					</button>
					<button className='movie__overview-add'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'>
							<path d='M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z' />
						</svg>
						My list
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieOverview;

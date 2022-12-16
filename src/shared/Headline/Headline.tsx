import { useAppDispatch, useAppSelector } from '../../core/store';
import { changeCurrentPage } from '../../core/store/MoviesSlice';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

import './Headline.scss';

const Headline = ({ children }: { children: string }) => {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector((state) => state.movies.currentPage);

	const clickNextPage = () => {
		dispatch(changeCurrentPage(currentPage + 1));
	};

	const clickPreviousPage = () => {
		dispatch(changeCurrentPage(currentPage - 1));
	};

	const previousButton =
		currentPage > 1 ? (
			<Button
				handleClick={clickPreviousPage}
				children='< Previous'
				buttonClass='page-button page-button_mr'
			/>
		) : null;

	return (
		<div className='headline'>
			<Typography component='h2'>{children}</Typography>

			<div className='headline__buttons'>
				{previousButton}

				<Button
					handleClick={clickNextPage}
					children='Next >'
					buttonClass='page-button'
				/>
			</div>
		</div>
	);
};

export default Headline;

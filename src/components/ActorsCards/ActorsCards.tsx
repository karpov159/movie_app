import { useEffect } from 'react';
import { store } from '../../core/store';
import { useAppSelector, useAppDispatch } from '../../core/store';
import {
	selectAll,
	fetchActors,
	changeCurrentPage,
} from '../../core/store/ActorsSlice';
import { useNavigate } from 'react-router-dom';
import ActorCard from './ActorCard/ActorCard';
import Typography from '../../shared/Typography/Typography';
import Button from '../../shared/Button/Button';

import Spinner from '../../shared/Spinner/Spinner';
import { BASE } from '../../core/config/RoutesConfig';

interface ActorsProps {
	directory: string;
	title: string;
}

const ActorsCards = ({ directory, title }: ActorsProps) => {
	const currentPage = useAppSelector((state) => state.actors.currentPage);
	const allActors = selectAll(store.getState());
	const actorsLoadingStatus = useAppSelector(
		(state) => state.actors.actorsLoadingStatus
	);
	const searchField = useAppSelector((state) => state.movies.searchField);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (searchField) {
			navigate(BASE.PATH);
		}
	}, [searchField, navigate]);

	useEffect(() => {
		dispatch(fetchActors(directory + currentPage));
	}, [currentPage, dispatch, directory]);

	const renderActors = (actors: any[]) => {
		return actors.map((actor) => {
			return <ActorCard key={actor.id} {...actor} />;
		});
	};

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

	const spinner = actorsLoadingStatus === 'loading' ? <Spinner /> : null;
	const actorsCards =
		actorsLoadingStatus === 'idle' ? renderActors(allActors) : null;

	return (
		<>
			<div className='content-page__headline'>
				<Typography component='h2' children={title} />

				<div className='content-page__buttons'>
					{previousButton}

					<Button
						handleClick={clickNextPage}
						children='Next >'
						buttonClass='page-button'
					/>
				</div>
			</div>

			<div className='content-page__actors'>{actorsCards}</div>

			{spinner}
		</>
	);
};

export default ActorsCards;

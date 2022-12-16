import { useEffect } from 'react';
import { store } from '../../core/store';
import { useAppSelector, useAppDispatch } from '../../core/store';
import { selectAll, fetchActors } from '../../core/store/ActorsSlice';
import { useNavigate } from 'react-router-dom';
import { BASE } from '../../core/config/RoutesConfig';
import Error from '../../shared/Error/Error';
import ActorCard from './ActorCard/ActorCard';
import Spinner from '../../shared/Spinner/Spinner';
import ActorData from '../../shared/interfaces/actor.interface';
import Headline from '../../shared/Headline/Headline';

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

	const renderActors = (actors: ActorData[]) => {
		return actors.map((actor) => {
			return <ActorCard key={actor.id} {...actor} />;
		});
	};

	const spinner = actorsLoadingStatus === 'loading' ? <Spinner /> : null;

	const error = actorsLoadingStatus === 'error' ? <Error /> : null;

	const actorsCards =
		actorsLoadingStatus === 'idle' ? renderActors(allActors) : null;

	return (
		<>
			<Headline>{title}</Headline>

			{error}

			<div className='content-page__actors'>{actorsCards}</div>

			{spinner}
		</>
	);
};

export default ActorsCards;

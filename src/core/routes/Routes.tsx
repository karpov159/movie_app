import { Routes, Route } from 'react-router-dom';
import { Homepage, ContentPage, FavoriteMovies } from '../../pages';
import {
	BASE,
	MOVIES,
	TVSHOWS,
	ANIMATIONS,
	ACTORS,
	FAVORITE,
} from '../config/RoutesConfig';
import MoviesCards from '../../components/MoviesCards/MoviesCards';
import ActorsCards from '../../components/ActorsCards/ActorsCards';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={BASE.PATH} element={<Homepage />}>
				<Route
					path={BASE.PATH}
					element={
						<ContentPage
							title={BASE.TITLE}
							directory={BASE.DIRECTORY}
							render={(directory, title) => (
								<MoviesCards
									directory={directory}
									title={title}
								/>
							)}
						/>
					}
				/>
				<Route
					path={MOVIES.PATH}
					element={
						<ContentPage
							title={MOVIES.TITLE}
							directory={MOVIES.DIRECTORY}
							render={(directory, title) => (
								<MoviesCards
									directory={directory}
									title={title}
								/>
							)}
						/>
					}
				/>
				<Route
					path={TVSHOWS.PATH}
					element={
						<ContentPage
							title={TVSHOWS.TITLE}
							directory={TVSHOWS.DIRECTORY}
							render={(directory, title) => (
								<MoviesCards
									directory={directory}
									title={title}
								/>
							)}
						/>
					}
				/>
				<Route
					path={ANIMATIONS.PATH}
					element={
						<ContentPage
							title={ANIMATIONS.TITLE}
							directory={ANIMATIONS.DIRECTORY}
							render={(directory, title) => (
								<MoviesCards
									directory={directory}
									title={title}
								/>
							)}
						/>
					}
				/>
				<Route
					path={ACTORS.PATH}
					element={
						<ContentPage
							title={ACTORS.TITLE}
							directory={ACTORS.DIRECTORY}
							render={(directory, title) => (
								<ActorsCards
									directory={directory}
									title={title}
								/>
							)}
						/>
					}
				/>
			</Route>
			<Route
				path={FAVORITE.PATH}
				element={<FavoriteMovies title={FAVORITE.TITLE} />}
			/>
		</Routes>
	);
};

export default AppRoutes;

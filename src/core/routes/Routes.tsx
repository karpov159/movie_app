import { Routes, Route } from 'react-router-dom';
import { Homepage, ContentPage } from '../../pages';
import {
	BASE,
	MOVIES,
	TVSHOWS,
	ANIMATIONS,
	ACTORS,
} from '../config/RoutesConfig';

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
						/>
					}
				/>
				<Route
					path={MOVIES.PATH}
					element={
						<ContentPage
							title={MOVIES.TITLE}
							directory={MOVIES.DIRECTORY}
						/>
					}
				/>
				<Route
					path={TVSHOWS.PATH}
					element={
						<ContentPage
							title={TVSHOWS.TITLE}
							directory={TVSHOWS.DIRECTORY}
						/>
					}
				/>
				<Route
					path={ANIMATIONS.PATH}
					element={
						<ContentPage
							title={ANIMATIONS.TITLE}
							directory={ANIMATIONS.DIRECTORY}
						/>
					}
				/>
				<Route path={ACTORS.PATH} element={<h1>ACTORS</h1>} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;

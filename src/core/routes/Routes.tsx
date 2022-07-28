import { Routes, Route } from 'react-router-dom';
import { Homepage } from '../../pages';
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
			<Route path={BASE} element={<Homepage />}>
				<Route
					path={MOVIES}
					element={<h1 style={{ color: '#fff' }}>MOVIES</h1>}
				/>
				<Route
					path={TVSHOWS}
					element={<h1 style={{ color: '#fff' }}>TVSHOWS</h1>}
				/>
				<Route
					path={ANIMATIONS}
					element={<h1 style={{ color: '#fff' }}>ANIMATIONS</h1>}
				/>
				<Route
					path={ACTORS}
					element={<h1 style={{ color: '#fff' }}>ACTORS</h1>}
				/>
			</Route>
		</Routes>
	);
};

export default AppRoutes;

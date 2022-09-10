import { API_KEY, BASE_URL } from '../../helpers/constants';

interface RoutesData {
	PATH: string;
	TITLE: string;
	DIRECTORY: string;
}

const RoutesConfig: Record<string, RoutesData> = {
	BASE: {
		PATH: '/',
		TITLE: 'Popular movies',
		DIRECTORY: `${BASE_URL}discover/movie?sort_by=popularity.desc&${API_KEY}&page=`,
	},
	MOVIES: {
		PATH: '/movies',
		TITLE: 'Movies',
		DIRECTORY: `${BASE_URL}movie/top_rated?${API_KEY}&page=`,
	},
	TVSHOWS: {
		PATH: '/tvshows',
		TITLE: 'TV shows',
		DIRECTORY: `${BASE_URL}tv/popular?${API_KEY}&page=`,
	},
	ANIMATIONS: {
		PATH: '/animations',
		TITLE: 'Animations',
		DIRECTORY: `${BASE_URL}discover/movie?${API_KEY}&with_genres=16&sort_by=vote_count.desc&vote_count.gte=10&page=`,
	},
	ACTORS: {
		PATH: '/actors',
		TITLE: 'Actors',
		DIRECTORY: `${BASE_URL}person/popular?${API_KEY}&page=`,
	},
	FAVORITE: {
		PATH: '/favorite',
		TITLE: 'My list',
		DIRECTORY: '',
	},
};

export const { BASE, MOVIES, TVSHOWS, ANIMATIONS, ACTORS, FAVORITE } =
	RoutesConfig;

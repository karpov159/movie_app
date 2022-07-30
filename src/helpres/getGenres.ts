import httpRequest from '../services/httpRequest';
import { useCallback } from 'react';

const genres: Record<number, string> = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western',
};

const getGenres = () => {
	const apiGenres =
		'https://api.themoviedb.org/3/genre/movie/list?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

	const genres = httpRequest(apiGenres);

	console.log(genres);
	return genres;
};

export default getGenres;

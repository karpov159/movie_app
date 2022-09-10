interface MovieInfo {
	backdrop_path: string;
	poster_path: string;
	title: string;
	release_date: string;
	vote_average: number;
	genre_ids: number[];
	overview: string;
	id: number;
	first_air_date: string;
	name?: string;
}

export default MovieInfo;

import MovieInfo from './movie.interface';

interface ActorData {
	adult: boolean;
	gender: number;
	id: number;
	known_for: MovieInfo[];
	known_for_department: string;
	name: string;
	popularity: number;
	profile_path: string;
}

export default ActorData;

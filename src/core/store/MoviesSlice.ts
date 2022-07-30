import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import httpRequest from '../../services/httpRequest';
import { RootState } from '.';

const BASE_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const apiGenres =
	'https://api.themoviedb.org/3/genre/movie/list?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const moviesAdapter = createEntityAdapter();

const initialState = moviesAdapter.getInitialState({
	moviesLoadingStatus: 'idle',
	genresData: {},
});

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
	const res = await httpRequest(BASE_URL);

	return res.results;
});

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
	const res = await httpRequest(apiGenres);

	return res;
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setGenres(state: any, action: PayloadAction<Record<number, string>>) {
			state.genresData = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.moviesLoadingStatus = 'loading';
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				moviesAdapter.setAll(state, action.payload);
				state.moviesLoadingStatus = 'idle';
			})
			.addCase(fetchMovies.rejected, (state) => {
				state.moviesLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const { reducer, actions } = moviesSlice;

export default reducer;

export const { selectAll } = moviesAdapter.getSelectors<RootState>(
	(state) => state.movies
);

export const { setGenres } = actions;

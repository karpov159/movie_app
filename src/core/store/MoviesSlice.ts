import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	EntityState,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { BASE_URL, API_KEY } from '../../helpers/constants';
import httpRequest from '../../services/httpRequest';

interface MoviesSliceState {
	moviesLoadingStatus: string;
	genresData: Record<number, string>;
	activeGenre: {
		name: string;
		num: null | string;
	};
	currentPage: number;
	currentTab: string;
	searchField: string;
}

const moviesAdapter = createEntityAdapter();

const initialState: EntityState<unknown> & MoviesSliceState =
	moviesAdapter.getInitialState({
		moviesLoadingStatus: 'idle',
		genresData: {},
		activeGenre: {
			name: '',
			num: null,
		},
		currentPage: 1,
		currentTab: '',
		searchField: '',
	});

export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (url: string) => {
		const res = await httpRequest(url);

		return res.results;
	}
);

export const fetchGenres = createAsyncThunk(
	'movies/fetchGenres',
	async (directory: string) => {
		const res = await httpRequest(
			`${BASE_URL}${directory}${API_KEY}&page=1`
		);

		return res;
	}
);

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setGenres(state, action: PayloadAction<Record<number, string>>) {
			state.genresData = action.payload;
		},
		setActiveGenre(
			state,
			action: PayloadAction<{ name: string; num: string | null }>
		) {
			state.activeGenre = {
				name: action.payload.name,
				num: action.payload.num,
			};
		},
		changeCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		changeCurrentTab(state, action: PayloadAction<string>) {
			state.currentTab = action.payload;
		},
		changeSearchField(state, action: PayloadAction<string>) {
			state.searchField = action.payload;
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

export const {
	setGenres,
	setActiveGenre,
	changeCurrentPage,
	changeCurrentTab,
	changeSearchField,
} = actions;

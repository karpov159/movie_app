import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { BASE_URL, API_KEY } from '../../helpers/constants';
import httpRequest from '../../services/httpRequest';

const moviesAdapter = createEntityAdapter();

const initialState = moviesAdapter.getInitialState({
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
		setGenres(state: any, action: PayloadAction<Record<number, string>>) {
			state.genresData = action.payload;
		},
		setActiveGenre(
			state: any,
			action: PayloadAction<{ name: string; num: string | null }>
		) {
			state.activeGenre = {
				name: action.payload.name,
				num: action.payload.num,
			};
		},
		changeCurrentPage(state: any, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		changeCurrentTab(state: any, action: PayloadAction<string>) {
			state.currentTab = action.payload;
		},
		changeSearchField(state: any, action: PayloadAction<string>) {
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

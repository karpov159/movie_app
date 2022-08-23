import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import httpRequest from '../../services/httpRequest';

const actorsAdapter = createEntityAdapter();

const initialState = actorsAdapter.getInitialState({
	actorsLoadingStatus: 'idle',
	currentPage: 1,
});

export const fetchActors = createAsyncThunk(
	'actors/fetchActors',
	async (url: string) => {
		const res = await httpRequest(url);

		return res.results;
	}
);

const actorsSlice = createSlice({
	name: 'actors',
	initialState,
	reducers: {
		changeCurrentPage(state: any, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchActors.pending, (state) => {
				state.actorsLoadingStatus = 'loading';
			})
			.addCase(fetchActors.fulfilled, (state, action) => {
				actorsAdapter.setAll(state, action.payload);
				state.actorsLoadingStatus = 'idle';
			})
			.addCase(fetchActors.rejected, (state) => {
				state.actorsLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const { reducer, actions } = actorsSlice;

export default reducer;

export const { selectAll } = actorsAdapter.getSelectors<RootState>(
	(state) => state.actors
);

export const { changeCurrentPage } = actions;

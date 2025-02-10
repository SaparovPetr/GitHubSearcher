import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus, TRepo } from "../../utils/types";
import { fetchRepos, getPublicReposCount } from "../thunks/fetchRepos";

export interface ReposState {
	username: string;
	repos: TRepo[];
	status: RequestStatus;
	error: string | null;
	currientPage: number;
	fetching: boolean;
	totalCount: number;
}

export const initialStateRepos: ReposState = {
	username: "",
	repos: [],
	status: RequestStatus.Idle,
	error: null,
	currientPage: 1,
	fetching: false,
	totalCount: 0,
};

export const reposSlice = createSlice({
	name: "reposSlice",
	initialState: initialStateRepos,
	reducers: {
		setCurrientPage(state, action) {
			state.currientPage = action.payload;
		},
		setFetching(state, action) {
			state.fetching = action.payload;
		},
		resetStore(state) {
			state.username = "";
			state.repos = [];
			state.status = RequestStatus.Idle;
			state.error = null;
			state.currientPage = 1;
			state.fetching = false;
			state.totalCount = 0;
		},
	},
	selectors: {
		selectRepos: (sliceState) => sliceState.repos,
		selectReposStatus: (sliceState) => sliceState.status,
		selectErrorWithRepo: (sliceState) => sliceState.error,
		selectFetching: (sliceState) => sliceState.fetching,
		selectCurientPage: (sliceState) => sliceState.currientPage,
		selectTotalCount: (sliceState) => sliceState.totalCount,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRepos.pending, (state) => {
				state.status = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(fetchRepos.fulfilled, (state, action) => {
				let nRepos = action.payload;
				state.repos = [...state.repos, ...nRepos];
				state.status = RequestStatus.Success;
				state.error = null;
				state.fetching = false;
			})
			.addCase(fetchRepos.rejected, (state, action) => {
				state.status = RequestStatus.Failed;
				state.error =
					action.error.message || "Укажите пользователя. Используйте латиницу.";
			})

			.addCase(getPublicReposCount.fulfilled, (state, action) => {
				state.totalCount = action.payload;
			})
			.addCase(getPublicReposCount.rejected, (state, action) => {
				state.status = RequestStatus.Failed;
				state.error =
					action.error.message ||
					"Не удалось загрузить общее число репозиториев.";
			});
	},
});

export const {
	selectErrorWithRepo,
	selectRepos,
	selectReposStatus,
	selectFetching,
	selectCurientPage,
	selectTotalCount,
} = reposSlice.selectors;

export const { resetStore, setCurrientPage, setFetching } = reposSlice.actions;

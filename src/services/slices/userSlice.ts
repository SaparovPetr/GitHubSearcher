import { createSlice } from "@reduxjs/toolkit";
import { checkhUserAuth } from "../thunks/checkhUserAuth";
import { RequestStatus } from "../../utils/types";

export interface IinitialStateForUser {
	isValid: boolean;
	token: string;
	requestStatus: RequestStatus;
}

export const initialStateForUser: IinitialStateForUser = {
	isValid: false,
	token: "",
	requestStatus: RequestStatus.Idle,
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState: initialStateForUser,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
		},
	},
	selectors: {
		getStatus: (sliceState) => sliceState.requestStatus,
		getIsAuthChecked: (sliceState) => sliceState.isValid,
		selectToken: (sliceState) => sliceState.token,
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkhUserAuth.fulfilled, (state, action) => {
				state.requestStatus = RequestStatus.Success;
				state.isValid = true;
			})
			.addCase(checkhUserAuth.pending, (state) => {
				state.requestStatus = RequestStatus.Loading;
			})
			.addCase(checkhUserAuth.rejected, (state) => {
				state.requestStatus = RequestStatus.Failed;
				state.isValid = false;
			});
	},
});

export const { getStatus, getIsAuthChecked, selectToken } = userSlice.selectors;

export const { setToken } = userSlice.actions;

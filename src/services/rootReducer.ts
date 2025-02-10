import { combineReducers } from "redux";
import { userSlice } from "./slices/userSlice";
import { reposSlice } from "./slices/reposSlice";

const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[reposSlice.name]: reposSlice.reducer,
});

export default rootReducer;

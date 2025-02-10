import { Route, Routes } from "react-router-dom";
import UserRepos from "../UserRepos/UserRepos";
import AuthComponent from "../AuthComponent/AuthComponent";
import { useAppSelector } from "../../services/store";
import { getStatus } from "../../services/slices/userSlice";

const App = () => {
	const reqStatus = useAppSelector(getStatus);

	return (
		<>
			<Routes>
				<Route path="/" element={<AuthComponent />} />

				{reqStatus === "Success" && (
					<Route path="/searcher" element={<UserRepos />} />
				)}
			</Routes>
		</>
	);
};

export default App;

import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { getStatus } from "../../services/slices/userSlice";
import AuthComponent from "../../pages/AuthComponent/AuthComponent";
import UserRepos from "../../pages/UserRepos/UserRepos";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const App = () => {
	const reqStatus = useAppSelector(getStatus);

	return (
		<>
			<Routes>
				<Route path="/" element={<AuthComponent />} />
				<Route path="*" element={<NotFoundPage />} />
				{reqStatus === "Success" && (
					<Route path="/searcher" element={<UserRepos />} />
				)}
			</Routes>
		</>
	);
};

export default App;

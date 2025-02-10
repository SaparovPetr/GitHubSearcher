import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectToken } from "../../services/slices/userSlice";
import {
	fetchRepos,
	getPublicReposCount,
} from "../../services/thunks/fetchRepos";
import {
	resetStore,
	selectCurientPage,
	selectErrorWithRepo,
	selectFetching,
	selectRepos,
	selectReposStatus,
	selectTotalCount,
	setCurrientPage,
	setFetching,
} from "../../services/slices/reposSlice";
import { rewriteDate } from "../../utils/rewriteDate";
import styles from "./UserRepos.module.css";
import LabledInput from "../../components/labeledInput/LabaledInput";
import { RequestStatus } from "../../utils/types";

const UserRepos = () => {
	const [usernameFromInput, setUsernameFromInput] = useState<string>("");
	const dispatch = useAppDispatch();
	const token = useAppSelector(selectToken);
	const repos = useAppSelector(selectRepos);
	const reqReposStatus = useAppSelector(selectReposStatus);
	const fetching = useAppSelector(selectFetching);
	const totalCount = useAppSelector(selectTotalCount);
	const error = useAppSelector(selectErrorWithRepo);
	const currentPage = useAppSelector(selectCurientPage);

	/** Эффекты изменения содержимого инпута */
	useEffect(() => {
		if (usernameFromInput && !usernameFromInput.startsWith(" ")) {
			dispatch(resetStore());
			dispatch(getPublicReposCount(usernameFromInput));
			dispatch(fetchRepos({ username: usernameFromInput, token, currentPage }));
		}

		if (usernameFromInput === "") {
			dispatch(resetStore());
		}
	}, [usernameFromInput]);

	/** Эффект изменения флага "необходима подгрузка" */
	useEffect(() => {
		if (fetching) {
			dispatch(setCurrientPage(currentPage + 1));
		}
	}, [fetching]);

	/** Эффект при изменении номера страницы */
	useEffect(() => {
		if (usernameFromInput) {
			dispatch(fetchRepos({ username: usernameFromInput, token, currentPage }));
		}
	}, [currentPage]);

	/** Эффект навешивания и снятия обработчика скролла */
	useEffect(() => {
		document.addEventListener("scroll", scrollHandller);
		return function () {
			document.removeEventListener("scroll", scrollHandller);
		};
	}, [repos, totalCount]);

	/** Обработчик скролла */
	const scrollHandller = (e: any) => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			repos.length < totalCount
		) {
			dispatch(setFetching(true));
		}
	};

	/** Обработчик ввода в инпуут */
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsernameFromInput(e.target.value);
	};

	return (
		<>
			<div className={styles.container}>
				<LabledInput
					content={"Введите имя пользователя на GitHub:"}
					inputValue={usernameFromInput}
					placeholder={"Имя пользователя"}
					onChange={handleUsernameChange}
				/>

				{repos.length !== 0 && (
					<h2 className={styles.results_title}>Репозитории пользователя:</h2>
				)}

				<ul className={styles.list}>
					{repos.map((repo) => (
						<li className={styles.card} key={repo.id}>
							<h3 className={styles.card_title}>{repo.name}</h3>
							<a
								className={styles.card_link}
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Перейти &#8594;
							</a>

							{repo.description && (
								<p className={styles.card_description}>
									Описание: {repo.description}
								</p>
							)}

							<p className={styles.card_stars}>
								Звезд: {repo.stargazers_count}
							</p>
							<p className={styles.card_lastUpdate}>
								Обновлен: {`${rewriteDate(repo.updated_at)}`}
							</p>
						</li>
					))}
				</ul>

				{reqReposStatus === RequestStatus.Loading && (
					<p className={styles.hint_loading}>Загрузка репозиториев...</p>
				)}

				{reqReposStatus === RequestStatus.Failed && (
					<p className={styles.hint_error}>{error}</p>
				)}

				{usernameFromInput.length > 0 &&
					repos.length === 0 &&
					!error &&
					reqReposStatus !== RequestStatus.Loading && (
						<p className={styles.hint_error}>Такой пользователь не найден</p>
					)}
			</div>
		</>
	);
};

export default UserRepos;

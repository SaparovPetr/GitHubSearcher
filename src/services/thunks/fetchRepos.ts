import { createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "@octokit/rest";
import { TFetchRepos } from "../../utils/types";

/** Асинхронный экшен (санк) получения репозиториев
 * @param username имя искомого пользователя
 * @param token токен для проверки факта авторизации
 * @param currentPage текущая страница
 */

export const fetchRepos = createAsyncThunk(
	"rep/fetchRepos",
	async ({ username, token, currentPage }: TFetchRepos) => {
		try {
			const octokit = new Octokit({
				auth: token,
			});
			await octokit.users.getAuthenticated();
			const response = await octokit.request(
				`GET /users/${username}/repos?per_page=20&page=${currentPage}`,
				{
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
				}
			);
			return response.data;
		} catch (error: any) {
			if (error.status === 401) {
				throw new Error("Ошибка: невалидный токен");
			} else {
				throw new Error();
			}
		}
	}
);

/** Санк получения общего числа репозиториев
 * @param username имя искомого пользователя
 */
export const getPublicReposCount = createAsyncThunk(
	"rep/fetchTotalCountRepos",
	async (username: string) => {
		try {
			const response = await fetch(`https://api.github.com/users/${username}`);
			if (!response.ok) {
				throw new Error(`Ошибка: ${response.statusText}`);
			}
			const data = await response.json();
			return data.public_repos;
		} catch (error) {
			throw new Error("Ошибка при получении общего количества репозиториев:");
		}
	}
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "@octokit/rest";

/** Санк авторизации по токену
 * @param token PAT-токен Гитхаба
 */
export const checkhUserAuth = createAsyncThunk(
	"user/checkhUserAuth",
	async (token: string) => {
		try {
			const octokit = new Octokit({
				auth: token,
			});
			await octokit.users.getAuthenticated();
			return true;
		} catch (error: any) {
			throw new Error("Ошибка входа. Проверьте токен");
		}
	}
);

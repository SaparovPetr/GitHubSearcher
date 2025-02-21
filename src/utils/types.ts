import { ChangeEventHandler } from "react";

/** Состояния приложения
 * @param Idle простаивает
 * @param Loading загружается
 * 	@param Success успешно загружено
 * 	@param Failed ошибка
 */
export const enum RequestStatus {
	Idle = "Idle",
	Loading = "Loading",
	Success = "Success",
	Failed = "Failed",
}

/** Типизация одного репозитория */
export type TRepo = {
	id: number;
	name: string;
	description: string;
	html_url: string;
	stargazers_count: string;
	updated_at: string;
};

/** Типизация пропсов инпута */
export type TLabledInput = {
	content: string;
	inputValue: string;
	placeholder: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
};

/** Типизация экшена запроса репозиториев */
export interface IFetchRepos {
	username: string;
	token: string;
	currentPage: number;
}

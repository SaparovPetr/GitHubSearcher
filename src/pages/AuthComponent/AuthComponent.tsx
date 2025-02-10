import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { checkhUserAuth } from "../../services/thunks/checkhUserAuth";
import {
	getStatus,
	selectToken,
	setToken,
} from "../../services/slices/userSlice";
import { NavLink } from "react-router-dom";
import styles from "./AuthComponent.module.css";
import LabaledInput from "../../components/labeledInput/LabaledInput";
import { RequestStatus } from "../../utils/types";

const AuthComponent = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(selectToken);
	const status = useAppSelector(getStatus);
	const [inputValue, setInputValue] = useState(token);

	/** Обработчик ввода в инпут */
	const handleTokenChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		dispatch(checkhUserAuth(e.target.value));
		dispatch(setToken(e.target.value));
	};

	return (
		<div className={styles.container}>
			<LabaledInput
				content={"Введите ваш GitHub токен:"}
				inputValue={inputValue}
				placeholder={"GitHub PAT Token"}
				onChange={handleTokenChange}
			/>

			{status === RequestStatus.Idle && (
				<div className={styles.hint}>Укажите токен</div>
			)}
			{status === RequestStatus.Loading && (
				<div className={styles.hint}>Проверяем...</div>
			)}
			{status === RequestStatus.Failed && (
				<div className={styles.hint_failed}>Ошибка в токене</div>
			)}

			{status === RequestStatus.Success && (
				<div className={styles.hint_success}>
					<div className={styles.hint}>Токен проверен!</div>
					<NavLink className={styles.hint_button} to="/searcher">
						Дальше
					</NavLink>
				</div>
			)}
		</div>
	);
};

export default AuthComponent;

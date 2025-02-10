import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const NotFoundPage = () => {
	const navigate = useNavigate();
	const goToBack = () => {
		navigate("/");
	};
	return (
		<div className={styles.page_not_found}>
			<h1>😒</h1>
			<p>
				Зря вы обновили старницу. Функциональность сохранения токена в локальном
				хранилище еще не реализована.
			</p>
			<a className={styles.linkToBack} onClick={goToBack}>
				Ввернуться назад
			</a>
		</div>
	);
};

export default NotFoundPage;

import { TLabledInput } from "../../utils/types";
import styles from "./LabaledInput.module.css";

const LabledInput = ({
	inputValue,
	onChange,
	placeholder,
	content,
}: TLabledInput) => {
	return (
		<label className={styles.label}>
			{content}
			<input
				className={styles.input}
				type="text"
				value={inputValue}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</label>
	);
};

export default LabledInput;

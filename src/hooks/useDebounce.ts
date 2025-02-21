import { useEffect, useState } from "react";

/** хук возвращения введенного значения с задержкой */
function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() => {
			// Обновление значения после истечения задержки
			const t = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// снятие таймера после установления задержки
			return () => {
				clearTimeout(t);
			};
		},
		[value, delay] // перезапуск при изменении значения
	);
	return debouncedValue;
}

export default useDebounce;

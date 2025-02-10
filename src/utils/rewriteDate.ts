/** Функция изменения написания даты
 *  @param parametr значение, подлежащее изменению
 */
export const rewriteDate = (parametr: string) => {
	const date = new Date(parametr);
	const formattedDate = date.toLocaleDateString("ru-RU");
	return formattedDate;
};

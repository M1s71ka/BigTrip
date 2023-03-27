export const getRandomNumber = (minimum, maximum) => {
	minimum = Math.ceil(Math.min(Math.abs(minimum), Math.abs(maximum)));
	maximum = Math.floor(Math.max(Math.abs(minimum), Math.abs(maximum)));
	return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};
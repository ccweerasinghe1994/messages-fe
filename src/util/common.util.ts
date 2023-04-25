const passwordCheck = (password: string) => {
	const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return !re.test(password);
};
const emailCheck = (email: string) => {
	const re = /\S+@\S+\.\S+/;
	return !re.test(email);
};
export { passwordCheck, emailCheck };

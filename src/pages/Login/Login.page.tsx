import { FC, useEffect, useState } from 'react';

const LoginPage: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const validateEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const checkPassword = (password: string) => {
		const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		return re.test(password);
	};

	useEffect(() => {
		setEmailError(validateEmail(email));
	}, [email]);

	useEffect(() => {
		setPasswordError(checkPassword(password));
	}, [password]);

	return <div>Login Page</div>;
};

export default LoginPage;

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import ErrorPage from '../../Components/Error/Error.component';
import Input from '../../Components/Input/Input.component';
import Button from '../../Components/Button/Button.component';

const LoginPage: FC = () => {
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	console.log('');

	const validateEmail = useCallback((email: string) => {
		const re = /\S+@\S+\.\S+/;
		return !re.test(email);
	}, []);

	const checkPassword = useCallback((password: string) => {
		const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		return !re.test(password);
	}, []);

	useEffect(() => {
		if (email === undefined) return;
		setEmailError(validateEmail(email));
	}, [email, validateEmail]);

	useEffect(() => {
		if (password === undefined) return;
		setPasswordError(checkPassword(password));
	}, [password, checkPassword]);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	}, []);
	const disabled = useMemo(() => {
		return emailError || passwordError;
	}, [emailError, passwordError]);

	return (
		<div className="container mx-auto mt-10">
			<form className="border border-blue-200 sm:p-5 md:p-10 ">
				<h3 className="font-semi-bold text-xl text-center mb-10 text-slate-500">
					Sign Up To The Application
				</h3>
				<div className="mb-10">
					<Input
						name="email"
						type="text"
						placeholder="Email"
						value={email}
						onChange={handleChange}
						className="w-[50%]"
					/>
					{emailError && <ErrorPage>Invalid email</ErrorPage>}
				</div>
				<div className="mb-10">
					<Input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={handleChange}
						className="w-[50%]"
					/>
					{passwordError && <ErrorPage>Invalid password</ErrorPage>}
				</div>

				<Button type="submit" disabled={disabled}>
					Login
				</Button>
			</form>
		</div>
	);
};

export default LoginPage;

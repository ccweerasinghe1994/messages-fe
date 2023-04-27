import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import ErrorPage from '../../Components/Error/Error.component';
import Input from '../../Components/Input/Input.component';
import Button from '../../Components/Button/Button.component';
import { emailCheck, passwordCheck } from '../../util/common.util';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useSignInMutation } from '../../store/api/user/user.api';
import { setSignInUser } from '../../store/slices/user.slice';

export const LoginPage: FC = () => {
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const [signIn, signInResponse] = useSignInMutation();

	const { data, isError, error, isLoading, isSuccess } = signInResponse;
	const errorMessage = error as IResError<Partial<IRes>>;

	const validateEmail = useCallback(emailCheck, []);
	const checkPassword = useCallback(passwordCheck, []);
	const navigate = useNavigate();

	useEffect(() => {
		if (email === undefined) return;
		setEmailError(validateEmail(email));
	}, [email, validateEmail]);

	useEffect(() => {
		if (password === undefined) return;
		setPasswordError(checkPassword(password));
	}, [password, checkPassword]);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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

	const handleSignIn = useCallback(() => {
		if (email === undefined || password === undefined) return;
		void signIn({ email, password });
	}, [email, password, signIn]);

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}, []);

	useEffect(() => {
		if (!isLoading && isSuccess) {
			dispatch(setSignInUser(data));
			navigate('/home');
		}
	}, [isLoading, isSuccess, navigate, dispatch, data]);
	return (
		<div className="w-1/2 mx-auto mt-10">
			<form
				onSubmit={handleSubmit}
				className="border border-blue-200 sm:p-5 md:p-10 ">
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

				<Button
					loading={isLoading}
					type="submit"
					disabled={disabled}
					onClick={handleSignIn}>
					Login
				</Button>
				{isError && <ErrorPage>{errorMessage.data.message}</ErrorPage>}
				{isSuccess && (
					<div
						className={
							'border border-green-900 text-green-500 p-2 mb-4 mt-2 w-fit bg-green-100 rounded-lg'
						}>
						{data.email} is successfully created
					</div>
				)}
			</form>
		</div>
	);
};

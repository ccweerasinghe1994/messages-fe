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
// let's import the svg file
import Logo from '../../assets/bg-1.svg';
import GooleIcon from '../../assets/icon-google.svg';
import FaceBookIcon from '../../assets/icon-facebook.svg';
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
		<div className="w-full flex mt-10">
			<div className="w-1/2">
				<form onSubmit={handleSubmit} className="sm:p-5 md:p-10 ">
					<h3 className="font-semi-bold text-4xl text-left mb-2 text-slate-950 tracking-wide">
						Login
					</h3>
					<h4>Let&apos;s get you setup</h4>

					<div className="mt-10 flex flex-col gap-3 w-2/3 ">
						<label className="tracking-wider" htmlFor="email" aria-required>
							Email*
						</label>
						<div className="w-full rounded-full h-14 bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-[2px]">
							<Input
								name="email"
								type="text"
								placeholder="Email"
								value={email}
								onChange={handleChange}
								className=""
								required
							/>
						</div>

						{emailError && <ErrorPage>Invalid email</ErrorPage>}
					</div>
					<div className="mt-10 flex flex-col gap-3 w-2/3  ">
						<label className="tracking-wider" htmlFor="email" aria-required>
							Password*
						</label>
						<div className="w-full rounded-full h-14 bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-[2px]">
							<Input
								name="password"
								type="password"
								placeholder="Password"
								value={password}
								onChange={handleChange}
								className="w-[50%]"
							/>
						</div>
						{passwordError && <ErrorPage>Invalid password</ErrorPage>}
					</div>

					<Button
						loading={isLoading}
						type="submit"
						disabled={disabled}
						onClick={handleSignIn}
						className="mt-10 bg-gradient-to-r from-green-300 to-green-500 hover:bg-blue-700 text-white font-bold py-3 px-28 rounded-full disabled:bg-slate-400 flex gap-2 items-center">
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
				<div className="flex justify-center flex-col w-1/2 mx-auto">
					<Button
						loading={isLoading}
						type="submit"
						onClick={handleSignIn}
						className="mt-10  text-black border-2 py-3 px-28 rounded-full disabled:bg-slate-400 flex gap-2 items-center">
						<img className="h-6 mr-2" src={GooleIcon} alt="google icon" /> Sign
						in with Google
					</Button>
					<Button
						loading={isLoading}
						type="submit"
						className="mt-10  text-black border-2 py-3 px-28 rounded-full disabled:bg-slate-400 flex gap-2 items-center">
						<img className="h-6 mr-2" src={FaceBookIcon} alt="google icon" />{' '}
						Sign in with Facebook
					</Button>
				</div>
			</div>
			<div className="w-1/2 ">
				<img className="border-2 rounded-3xl" src={Logo} alt="logo" />
			</div>
		</div>
	);
};

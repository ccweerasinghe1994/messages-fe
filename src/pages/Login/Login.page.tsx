import { Button, TextField, Typography } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));
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

	return (
		<Grid container justifyContent={'center'}>
			<Grid xs={6}>
				<Item>
					<Typography variant="h3" gutterBottom>
						Sign Up To MESSAGES
					</Typography>
					<TextField
						fullWidth
						required
						id="filled-basic"
						label="email"
						variant="filled"
						type="email"
						value={email}
						placeholder="sample@abc.com"
						onChange={(e) => setEmail(e.target.value)}
						error={!emailError}
						helperText={!emailError ? 'Invalid email' : ''}
						sx={{ mt: 3, mb: 2 }}
					/>
					<TextField
						fullWidth
						required
						id="filled-basic"
						label="password"
						variant="filled"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={!passwordError}
						sx={{ mt: 3, mb: 2 }}
						helperText={
							!passwordError
								? 'password must only contain numbers and characters and length must be 8 or higher'
								: ''
						}
					/>

					<Button
						fullWidth
						variant="contained"
						disabled={!emailError || !passwordError}
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
				</Item>
			</Grid>
		</Grid>
	);
};

export default LoginPage;

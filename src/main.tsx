import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from '@mui/material/styles';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home/Home.page';
import NotFound from './pages/NotFound/NotFound.page';
import AboutPage from './pages/About/About.page';
import LoginPage from './pages/Login/Login.page';

export enum Routes {
	Home = '/home',
	About = '/about',
	Login = '/login',
}

export const CustomRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: Routes.Home,
				element: <HomePage />,
			},
			{
				path: Routes.About,
				element: <AboutPage />,
			},
			{
				path: Routes.Login,
				element: <LoginPage />,
			},
		],
	},

	{
		path: '/*',
		element: <NotFound />,
	},
]);
const rootElement = document.getElementById('root') as HTMLElement;

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme({
	components: {
		MuiPopover: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiPopper: {
			defaultProps: {
				container: rootElement,
			},
		},
	},
});

ReactDOM.createRoot(rootElement).render(
	<Provider store={store}>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={CustomRouter} />
			</ThemeProvider>
		</StyledEngineProvider>
	</Provider>
);

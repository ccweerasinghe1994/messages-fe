import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home/Home.page';
import NotFound from './pages/NotFound/NotFound.page';
import AboutPage from './pages/About/About.page';
import LoginPage from './pages/Login/Login.page';
import ErrorBoundary from './ErrorBoundry';

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
				element: (
					<ErrorBoundary fallback={<p>Something went wrong</p>}>
						<LoginPage />
					</ErrorBoundary>
				),
			},
		],
	},

	{
		path: '/*',
		element: <NotFound />,
	},
]);
const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
	<Provider store={store}>
		<RouterProvider router={CustomRouter} />
	</Provider>
);

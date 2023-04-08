import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<RouterProvider router={CustomRouter} />
	</Provider>
);

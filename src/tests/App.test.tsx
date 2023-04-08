import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import HomePage from '../pages/Home/Home.page';
import AboutPage from '../pages/About/About.page';
import LoginPage from '../pages/Login/Login.page';
import NotFoundPage from '../pages/NotFound/NotFound.page';

describe('App', () => {
	it('landing on a bad page', async () => {
		const badRoute = '/12w12312';

		// use <MemoryRouter> when you want to manually control the history
		render(
			<MemoryRouter initialEntries={[badRoute]}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="/home" element={<HomePage />} />
						<Route path="/about/*" element={<AboutPage />} />
						<Route path="/login/*" element={<LoginPage />} />
						<Route path="/*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</MemoryRouter>
		);

		// verify navigation to "no match" route
		expect(screen.getByText(/NOT FOUND/i)).toBeInTheDocument();

		const user = userEvent.setup();

		// verify page content for expected route after navigating
		await user.click(
			screen.getByRole('link', {
				name: 'About',
			})
		);
		expect(screen.getByText(/About Page/i)).toBeInTheDocument();

		await user.click(
			screen.getByRole('link', {
				name: 'Login',
			})
		);
		expect(screen.getByText(/Login Page/i)).toBeInTheDocument();

		await user.click(
			screen.getByRole('link', {
				name: 'Home',
			})
		);
		expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
	});
});

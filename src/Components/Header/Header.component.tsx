import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from 'classnames';
import { Routes } from '../../main';

const LinkRoutesStyles = classes('flex px-3 py-1 rounded bg-blue-200');
const commonStyles = classes('px-3 py-1');
const navLinkStyles = classes(
	'flex justify-items-start gap-10 px-3 h-10 text-xl flex-wrap mb-3'
);
const Header: FC = () => {
	const { pathname } = useLocation();
	const isHome = pathname === Routes.Home || pathname === '/';
	const isAbout = pathname === Routes.About;
	const isLogin = pathname === Routes.Login;

	return (
		<nav className={navLinkStyles}>
			<Link className={isHome ? LinkRoutesStyles : commonStyles} to={'/home'}>
				Home
			</Link>
			<Link className={isAbout ? LinkRoutesStyles : commonStyles} to={'/about'}>
				About
			</Link>
			<Link className={isLogin ? LinkRoutesStyles : commonStyles} to={'/login'}>
				Login
			</Link>
		</nav>
	);
};

export default Header;

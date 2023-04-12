import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from 'classnames';
import { Routes } from '../../main';
import { MdOutlineLogin } from 'react-icons/md';

const LinkRoutesStyles = classes(
	'bg-blue-500 px-4 py-1 hover:bg-blue-700 rounded'
);
const commonStyles = classes('px-3 py-1');
const navLinkStyles = classes(
	'flex justify-between mx-auto text-xl text-white pt-6 ml-5'
);

const Header: FC = () => {
	const { pathname } = useLocation();
	const isHome = pathname === Routes.Home || pathname === '/';
	const isAbout = pathname === Routes.About;
	const isLogin = pathname === Routes.Login;

	return (
		<nav className={navLinkStyles}>
			<div className={'py-1'}>
				<Link className={isHome ? LinkRoutesStyles : commonStyles} to={'/home'}>
					Home
				</Link>
				<Link
					className={isAbout ? LinkRoutesStyles : commonStyles}
					to={'/about'}>
					About
				</Link>
			</div>
			<div
				className={
					'flex mr-5 border-blue-500 border rounded hover:border-blue-100'
				}>
				<Link
					className={isLogin ? LinkRoutesStyles : commonStyles}
					to={'/login'}>
					<MdOutlineLogin className={'inline mr-2'} />
					Login
				</Link>
			</div>
		</nav>
	);
};

export default Header;

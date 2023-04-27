import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from 'classnames';
import { Routes } from '../../main';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BsFillPersonCheckFill, BsFillPersonXFill } from 'react-icons/bs';
import { logout } from '../../store/slices/user.slice';

const LinkRoutesStyles = classes(
	'bg-blue-500 px-4 py-1 hover:bg-blue-700 rounded text-white'
);
const commonStyles = classes('px-3 py-1');
const navLinkStyles = classes('flex justify-between mx-auto text-xl pt-6 ml-5');

export const Header: FC = () => {
	const { user, isAuthenticated } = useAppSelector(
		(state) => state.loggedInUser
	);
	const dispatch = useAppDispatch();

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
			{!isAuthenticated ? (
				<div
					className={
						'flex mr-5 border-blue-500 border rounded hover:border-blue-100'
					}>
					<Link
						className={isLogin ? LinkRoutesStyles : commonStyles}
						to={'/login'}>
						<BsFillPersonXFill className={'inline mr-2 text-red-500 '} />
						Login
					</Link>
				</div>
			) : (
				<span className={'px-3 py-1 flex items-center'}>
					<BsFillPersonCheckFill
						className={' text-2xl inline mr-2 text-green-500'}
					/>
					<span>{user?.email?.split('@')[0]}</span>
				</span>
			)}
			{isAuthenticated && (
				<Link
					className={
						'flex mr-5 border-blue-500 border rounded hover:border-blue-100'
					}
					to={'/login'}
					onClick={() => {
						dispatch(logout());
					}}>
					Logout
				</Link>
			)}
		</nav>
	);
};

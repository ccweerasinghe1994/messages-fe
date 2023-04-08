import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
	return (
		<>
			<h1>NOT FOUND</h1>
			<div>
				<Link to={'/home'}>Back To Home Page</Link>
			</div>
		</>
	);
};

export default NotFoundPage;

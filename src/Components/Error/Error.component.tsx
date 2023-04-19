import { FC, ReactNode } from 'react';

interface IErrorPageProps {
	children?: ReactNode;
}

const ErrorPage: FC<IErrorPageProps> = ({ children }) => {
	let content: ReactNode;
	if (children) {
		content = children;
	} else {
		content = <p>Something went wrong.</p>;
	}
	return (
		<div className="border border-red-900 text-red-500 p-2 mb-4 mt-2 w-fit bg-red-100 rounded-lg">
			{content}
		</div>
	);
};

export default ErrorPage;

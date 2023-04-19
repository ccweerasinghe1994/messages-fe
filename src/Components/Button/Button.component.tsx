import { FC, ReactNode } from 'react';

interface IButton {
	children: ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	type: 'button' | 'submit' | 'reset';
	disabled: boolean;
}

const Button: FC<IButton> = ({ children, type, disabled, ...props }) => {
	return (
		<button
			type={type}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded disabled:bg-slate-400"
			disabled={disabled}
			{...props}>
			{children}
		</button>
	);
};

export default Button;

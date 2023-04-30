import { FC, ReactNode } from 'react';
import { VscLoading } from 'react-icons/vsc';

interface IButton {
	children: ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	type: 'button' | 'submit' | 'reset';
	disabled: boolean;
	loading?: boolean;
}

const Button: FC<IButton> = ({
	children,
	type,
	disabled,
	loading,
	...props
}) => {
	return (
		<button
			type={type}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:bg-slate-400 flex gap-2 items-center "
			disabled={disabled}
			{...props}>
			{loading ? <VscLoading className={'animate-spin'} /> : ''}
			{children}
		</button>
	);
};

export default Button;

import { FC, ReactNode } from 'react';
import { VscLoading } from 'react-icons/vsc';
import classNames from 'classnames';
interface IButton {
	children: ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	type: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	loading?: boolean;
}

const Button: FC<IButton> = ({
	children,
	type,
	disabled,
	loading,
	className,
	...props
}) => {
	const classNamesList = classNames(' ', className);
	return (
		<button
			type={type}
			className={classNamesList}
			disabled={disabled}
			{...props}>
			{loading ? <VscLoading className={'animate-spin'} /> : ''}
			{children}
		</button>
	);
};

export default Button;

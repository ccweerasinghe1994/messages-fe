import { FC } from 'react';
import classNames from 'classnames';
interface IInputProps {
	type: string;
	placeholder: string;
	value: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	className?: string;
}

const Input: FC<IInputProps> = ({
	value,
	placeholder,
	onChange,
	type,
	name,
	className,
}) => {
	const inputClasses = classNames(
		'w-full h-10 border-2 border-gray-300 rounded-md px-2 focus:outline-none focus:border-blue-500',
		className
	);

	return (
		<input
			className={inputClasses}
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

export default Input;

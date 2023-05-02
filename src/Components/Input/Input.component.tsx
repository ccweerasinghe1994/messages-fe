import { FC } from 'react';
import classNames from 'classnames';
interface IInputProps {
	type: string;
	placeholder: string;
	value: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	className?: string;
	required?: boolean;
}

const Input: FC<IInputProps> = ({
	value,
	placeholder,
	onChange,
	type,
	name,
	className,
	required,
}) => {
	const inputClasses = classNames(
		'h-12 rounded-full pl-4 focus:outline-none focus:border-blue-500 w-full',
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
			required={required}
		/>
	);
};

export default Input;

type IUser = {
	email: string;
	password: string;
};

type IRes = {
	statusCode?: number;
	message?: string;
	error?: string;
	id?: number;
	email?: string;
};

type IResError<T> = {
	statusCode: number;
	data: T;
};

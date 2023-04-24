import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type IUser = {
	email: string;
	password: string;
};
const userApi = createApi({
	reducerPath: 'user',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/auth',
	}),
	endpoints: (builder) => {
		return {
			signIn: builder.mutation({
				query: (user: IUser) => ({
					url: '/signup',
					method: 'POST',
					body: user,
				}),
			}),
		};
	},
});

export const { useSignInMutation } = userApi;
export { userApi };

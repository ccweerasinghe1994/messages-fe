import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const userApi = createApi({
	reducerPath: 'user',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/auth',
		fetchFn: async (...args) => {
			// TODO REMOVE FOR PRODUCTION
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => {
		return {
			signIn: builder.mutation<IRes, IUser>({
				query: (user) => ({
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

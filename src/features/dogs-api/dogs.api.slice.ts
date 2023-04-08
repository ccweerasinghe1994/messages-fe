// noinspection SpellCheckingInspection

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY =
	'live_kicdDGwE77g052Gkl9558mF31sFJpJhwlG6nUzbXsclXPPO3zDwCH7OKmVPXIy3Z';

interface Breed {
	id: string;
	name: string;
	image: {
		url: string;
	};
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.thedogapi.com/v1',
		prepareHeaders(headers) {
			headers.set('x-api-key', API_KEY);
			return headers;
		},
	}),
	endpoints(builder) {
		return {
			fetchBreed: builder.query<Breed[], number | void>({
				query(limit = 10) {
					return `/breeds?limit=${limit || 10}`;
				},
			}),
		};
	},
});

export const { useFetchBreedQuery } = apiSlice;

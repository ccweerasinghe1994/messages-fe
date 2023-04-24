import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/user/user.api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(userApi.middleware);
	},
});

setupListeners(store.dispatch);

export { store };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { useSignInMutation } from './api/user/user.api';

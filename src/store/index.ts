import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/user/user.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/user.slice';
const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		loggedInUser: userReducer,
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
export { setSignInUser } from './slices/user.slice';

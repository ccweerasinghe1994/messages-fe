import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './api/user/user.api';
import userReducer from './slices/user.slice';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	loggedInUser: userReducer,
});

type ReducerType = typeof rootReducer;

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['loggedInUser'],
	blacklist: [userApi.reducerPath],
};
const persistedReducer: ReducerType = persistReducer(
	persistConfig,
	rootReducer
);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(userApi.middleware);
	},
});

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

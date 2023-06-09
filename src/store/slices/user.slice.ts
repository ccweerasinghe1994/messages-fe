import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
	user: IRes | null;
	isAuthenticated: boolean;
	error: string | null;
}

const initialState: initialState = {
	user: null,
	isAuthenticated: false,
	error: null,
};

const userSlice = createSlice({
	name: 'loggedInUser',
	initialState,
	reducers: {
		setSignInUser: (state, action: PayloadAction<IRes>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout: () => initialState,
	},
});

export const { setSignInUser, logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type AuthState = {
  isAuth: boolean;
  authToken: string | null;
  user: User | null;
};

const initialState: AuthState = {
  isAuth: false,
  authToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;

import React, { useReducer } from 'react';
import AuthContext from './AuthContex';
import AuthReducer from './AuthReducer';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCES,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthSate = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(AuthReducer, initialState);

	// Load User

	// Register User

	// Loging User

	// Logout

	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthSate;

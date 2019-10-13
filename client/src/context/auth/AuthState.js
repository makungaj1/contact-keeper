import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContex';
import AuthReducer from './AuthReducer';
import setAuhtToken from '../../utils/setAuthToken';
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
	const loadUser = async () => {
		// @todo load token into global headers
		if (localStorage.token) {
			setAuhtToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			});
		}
	};

	// Loging User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({
				type: LOGIN_SUCCES,
				payload: res.data
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg
			});
		}
	};

	// Logout
	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				clearErrors,
				loadUser,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthSate;

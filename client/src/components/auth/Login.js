import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContex';
import AlertContext from '../../context/alert/AlertContext';

const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(
		() => {
			if (isAuthenticated) {
				// Redirect to home page
				props.history.push('/');
			}
			if (error === 'Invalid Credential') {
				setAlert(error, 'danger');
				clearErrors();
			}
			// islint-disable-next-line
		},
		[ error, isAuthenticated, props.history, setAlert, clearErrors ]
	);

	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			setAlert('Please fill in all fields', 'danger');
		} else {
			login({
				email,
				password
			});
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>

			<form onSubmit={onSubmit}>
				<div className="form-froup">
					<label htmlFor="email">Email Address</label>
					<input type="email" name="email" value={email} onChange={onChange} />
				</div>
				<div className="form-froup">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={onChange} />
				</div>

				<input type="submit" value="Login" className="btn btn-primary btn-block" />
			</form>
		</div>
	);
};

export default Login;

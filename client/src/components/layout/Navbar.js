import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContex';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, user, logout } = authContext;

	const onLogout = () => {
		logout();
	};
	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>
				{isAuthenticated ? (
					<Fragment>
						<li>Hello {user && user.name}</li>
						{/* <li>
							<Link to="/">Home</Link>
						</li> */}
						{/* <li>
							<Link to="/about">About</Link>
						</li> */}
						<li>
							<a href="#!" onClick={onLogout}>
								<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
							</a>
						</li>
					</Fragment>
				) : (
					<Fragment>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</Fragment>
				)}
			</ul>
		</div>
	);
};

Navbar.protoTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt'
};
export default Navbar;

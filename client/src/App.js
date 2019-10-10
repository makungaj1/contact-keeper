import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactSate from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';

const App = () => {
	return (
		<AuthState>
			<ContactSate>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className="container">
								<Alerts />
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/about" component={About} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactSate>
		</AuthState>
	);
};

export default App;

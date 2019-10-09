import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactSate from './context/contact/contactState';
import Home from './components/pages/Home';
import About from './components/pages/About';

const App = () => {
	return (
		<ContactSate>
			<Router>
				<Fragment>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		</ContactSate>
	);
};

export default App;

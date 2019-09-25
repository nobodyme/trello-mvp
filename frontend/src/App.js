import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import BoardsPage from './pages/BoardsPage';
import ErrorPage from './pages/ErrorPage';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={BoardsPage} />
				<Route render={props => <ErrorPage {...props} />} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;

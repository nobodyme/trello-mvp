import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Loading from './components/Loading';
const BoardListPage = React.lazy(() => import('./pages/BoardListPage'));
const BoardDetailPage = React.lazy(() => import('./pages/BoardDetailPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

function App() {
	return (
		<BrowserRouter>
			<React.Suspense
				fallback={
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							height: '100%',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Loading />
					</div>
				}
			>
				<Switch>
					<Route path="/" exact component={BoardListPage} />
					<Route path="/board/:id" component={BoardDetailPage} />
					<Route render={props => <ErrorPage {...props} />} />
				</Switch>
			</React.Suspense>
		</BrowserRouter>
	);
}

export default App;

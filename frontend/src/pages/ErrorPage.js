import React from 'react';
import ErrorIcon from '../images/error.svg';

import '../styles/components/Error.css';

function ErrorPage() {
	return (
		<div className="error">
			<div>Page not found</div>
			<img src={ErrorIcon} alt="Page not found" />
		</div>
	);
}

export default ErrorPage;

import React, { Component } from 'react';
import '../Styles/NotFound.css';

export class NotFound extends Component {
	render() {
		return (
			<div className="errorDiv">
				<h1>Page Does Not Exist, Go Back</h1>
			</div>
		);
	}
}

export default NotFound;

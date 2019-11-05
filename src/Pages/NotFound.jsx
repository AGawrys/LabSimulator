import React, { Component } from 'react';
import '../Styles/NotFound.css';
import { Link } from 'react-router-dom';

export class NotFound extends Component {
	render() {
		return (
			<div className="errorDiv">
				<h1>Page Does Not Exist, Go Back</h1>
				<Link to="/">
					<button type="button" class="btn btn-dark">
						Homepage
					</button>
				</Link>
			</div>
		);
	}
}

export default NotFound;

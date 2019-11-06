import React, { Component } from 'react';
import '../Styles/NotFound.css';
import sparkle from '../Styles/Images/coffeeSparkle.gif';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';

export class NotFound extends Component {
	render() {
		return (
			<div className="errorDiv">
				
				
				<img src={sparkle} style={{ height: '70vh' }}alt="sparkle" />
				<h1 style={{paddingBottom: '5vh'}}>Opps! Not Found</h1>
				<Link to="/">
					<button type="button" style={{ backgroundColor: '#4F3E31', }} class="btn btn-dark">
						Homepage
					</button>
				</Link>
				<div style={{height: '8vh'}}></div>
			</div>
		);
	}
}

export default NotFound;

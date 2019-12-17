import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import 'react-sticky-header/styles.css';
import coffeeProcess from '../Styles/Images/coffeeProcess.gif';
import { Redirect, Link } from 'react-router-dom';
import Popup from '../Components/Popup.jsx';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import Agnieszka from '../Styles/Images/Agnieszka.png';
import James from '../Styles/Images/James.png';
import Jason from '../Styles/Images/Jason.png';
import Steven from '../Styles/Images/Steven.png';

import '../App.css';
import '../Styles/HomeStyle.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginbtn: 'Login'
		};
	}

	handleLogin() {
		return <Redirect exact to="/instructor/" />;
	}

	togglePopup() {
		let login = 'Login';
		if (!this.state.showPopup) {
			login = 'Cancel';
		}
		this.setState({
			showPopup: !this.state.showPopup,
			loginbtn: login,
			errorLogin: 'Invalid Credentials'
		});
	}

	render() {
		return (
			<div>
				<HeaderBru home={Routes.DEFAULT} />
				<section>
					<div className="Home-page">
						<div className="App">
							<header className="Home-header">
								<div className="Home-main-txt">
									<h2 className="Home-main-items">Bru, Barista Labratory</h2>
									<h1 className="Home-main-items">Your next orientation, online</h1>
									<p className="Home-main-items">
										Coffee is a brewed drink prepared from roasted coffee beans, the seeds of
										berries from certain Coffea species. The genus Coffea is native to tropical
										Africa (specifically having its origin in Ethiopia and Sudan) and Madagascar,
										the Comoros, Mauritius, and Réunion in the Indian Ocean. Coffee plants are
										now cultivated in over 70 countries, primarily in the equatorial regions of the
										Americas, Southeast Asia, Indian subcontinent, and Africa. The two most commonly
										grown are C. arabica and C. robusta. 
									</p>
									<Link to="/Signup" className="link">
										<div className="Home-main-items">
											Don't have an account? <code> Sign up!</code>
										</div>
									</Link>
								</div>
								<img src={coffeeProcess} className="App-logo" alt="logo" />
							</header>
						</div>
						<div className="Home-about">
							<Col>
						<h1 className="m-0 font-weight-light text-secondary headings" style={{ padding: '15px'}}> Meet The Bru Team </h1>
				
							<Row style={{ paddingTop: '25px', flex: '1', justifyContent: 'space-evenly'}}>
								<Col>
								<img src={James} class="rounded-circle" style={{ height: '30vh', width: '30vh'}} alt="Agnieszka"></img>
								<h5 className="m-0 font-weight-bold text-secondary headings" style={{ padding: '20px'}}>PROJECT MANAGER</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>James Angeles,</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>"not like those other guys"</h5>
								
								
								 
								</Col>
								<Col>
								<img src={Agnieszka} class="rounded-circle" style={{ height: '30vh', width: '30vh'}} alt="Agnieszka"></img>
								<h5 className="m-0 font-weight-bold text-secondary headings" style={{ padding: '20px'}}>LEAD DESIGNER</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>Agnieszka Gawrys, </h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>"2019, vibe check recipient"</h5>
								
								</Col>
								<Col>
								<img src={Jason} class="rounded-circle" style={{ height: '30vh', width: '30vh'}} alt="Agnieszka"></img>
								
								<h5 className="m-0 font-weight-bold text-secondary headings" style={{ padding: '20px'}}>LEAD PROGRAMMER</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>Jason Dong</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>"Baker's choice"</h5>
								
							</Col>
							<Col>
							<img src={Steven} class="rounded-circle" style={{ height: '30vh', width: '30vh'}} alt="Agnieszka"></img>
								<h5 className="m-0 font-weight-bold text-secondary headings" style={{ padding: '20px'}}>DATA DESIGNER</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>Steven Kuang</h5>
								<h5 className="m-0 font-weight-light text-secondary headings" style={{flex: 1, flexWrap: 'wrap'}}>"we kindly accept donations through venmo at @stevensaur"</h5>
								
								 
							</Col>
							</Row>
							</Col>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
export default Home;

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
								<Link to="/Signup" className="link">
										<div className="Home-main-items">
											Don't have an account? <code> Sign up!</code>
										</div>
									</Link>
									<h1 className="Home-main-items">Become a Barista through Bru</h1>
									<h1 className="Home-main-items"></h1>
									<p className="Home-main-items">
									Whether you're starting your journey with the basics or you're a master with secrets to share,
Bru is the place for you! Our learning environment is highly customizable and interactive, yet
simple and clean so instructors can create and share effective lessons. When it's time, send your
lessons to your students and they'll be ready to start learning new recipes instantly. It doesn't
matter if your cafe is big or small; escape the hectic rush hour and learn how to make drinks
properply with Bru.
									</p>
									
									<div className="Home-main-items">
											Scroll down to learn about the team!
										</div>
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

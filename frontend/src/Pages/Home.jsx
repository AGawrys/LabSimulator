import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'react-sticky-header/styles.css';
import coffeeProcess from '../Styles/Images/coffeeProcess.gif';
import { Redirect, Link } from 'react-router-dom';
import Popup from '../Components/Popup.jsx';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
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
									<h2 className="Home-main-items">Barista Labratory</h2>
									<h1 className="Home-main-items">Your next orientation, online</h1>
									<p className="Home-main-items">
										Coffee is a brewed drink prepared from roasted coffee beans, the seeds of
										berries from certain Coffea species. The genus Coffea is native to tropical
										Africa (specifically having its origin in Ethiopia and Sudan) and Madagascar,
										the Comoros, Mauritius, and Réunion in the Indian Ocean.[2] Coffee plants are
										now cultivated in over 70 countries, primarily in the equatorial regions of the
										Americas, Southeast Asia, Indian subcontinent, and Africa. The two most commonly
										grown are C. arabica and C. robusta. Once ripe, coffee berries are picked,
										processed, and dried. Roasted beans are ground and then brewed with near-boiling
										water to produce the beverage known as coffee.
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
							<h1> About something something</h1>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
export default Home;

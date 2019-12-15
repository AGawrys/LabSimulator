import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect, Link } from 'react-router-dom';
import title from '../Styles/Images/brü.svg';
import '../Styles/HeaderBruStyle.css';
import FormModal from '../Components/FormModal.jsx';
import { Button, Form, Modal, } from 'react-bootstrap';
import axios from 'axios';
import GeneralConstants from '../utils/GeneralConstants.js';
import Routes from '../utils/RouteConstants.js';

class HeaderBru extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginModal: false,
			email: '',
			password: '',
			authenticated: false,
			errors: '',
			role: null
		};
	}

	handleFieldChange = (e, field) => {
		this.setState({ [field]: e.target.value });
	};

	handleLogin = (e) => {
		e.preventDefault();

		const account = {
			email: this.state.email,
			password: this.state.password
		};

		axios.post(Routes.SERVER + 'account', account).then(
			(response) => {
				const { token, role } = response.data;
				localStorage.setItem('token', token);
				this.setState({
					authenticated: true,
					role: role
				});
			},
			(error) => {
				this.setState({
					errors: 'Error logging in! Incorrect email or password'
				});
			}
		);
	};

	render() {
		const { authenticated, loggedOut } = this.state;
		if (authenticated) {
			const route = this.getCorrectRoute(this.state.role);
			return <Redirect exact to={route} />;
		}

		if (loggedOut) {
			return <Redirect exact to={Routes.DEFAULT} />;
		}

		const navLinks = this.renderLinks();
		return (
			<Navbar bg="#69CB9A" className="justify-content-between">
				<Navbar.Brand>
					<Link exact to={this.props.home}>
						<img src={title} className="Home-header-logo" style={{ height: '50px' }} alt="logo" />
					</Link>
				</Navbar.Brand>
				<Nav>
					{navLinks}
					<Nav.Item>
						{this.props.isLoggedIn || this.state.authenticated ? (
							this.renderSignOutBtn()
						) : (
							this.renderLoginBtn()
						)}
					</Nav.Item>
				</Nav>
			</Navbar>
		);
	}

	renderLinks() {
		if (!this.props.links) {
			return null;
		}
		const navLinks = Object.entries(this.props.links).map((link, index) => {
			const [ text, route ] = link;
			return (
				<Nav.Item key={index}>
					<Nav.Link >
						<Link style={{color:"rgba(0,0,0,.5)"}} exact to={route}>{text}</Link>
					</Nav.Link>
				</Nav.Item>
			);
		});
		return navLinks;
	}

	renderLoginBtn() {
		return (
			<div className="loginModalButton">
				<Button
					variant="dark"
					onClick={() => {
						this.setState({ showLoginModal: true });
					}}
				>
					Login
				</Button>

				<FormModal
					title="Login"
					show={this.state.showLoginModal}
					onSubmit={this.handleLogin}
					onHide={() => {
						this.setState({ showLoginModal: false });
					}}
				>
					{this.getLoginForm()}
				</FormModal>
			</div>
		);
	}

	renderSignOutBtn() {
		return (
			<Button variant="dark" onClick={this.onSignOut}>
				Sign Out
			</Button>
		);
	}

	onSignOut = () => {
		localStorage.removeItem('token');
		this.setState({ loggedOut: true });
	};

	getLoginForm() {
		const errorMessage = this.state.errors;
		return (
			<div>
				<Modal.Body>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Enter Email"
							onChange={(e) => this.handleFieldChange(e, 'email')}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type="password"
							placeholder="Enter Password"
							onChange={(e) => this.handleFieldChange(e, 'password')}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<p style={{ color: 'red' }}> {errorMessage}</p>
					<Button variant="primary" type="submit" onClick={this.handleLogin}>
						Login
					</Button>
				</Modal.Footer>
			</div>
		);
	}

	getCorrectRoute(role) {
		if (role == GeneralConstants.STUDENT) {
			return Routes.STUDENT_DASHBOARD;
		} else if (role == GeneralConstants.INSTRUCTOR) {
			return Routes.INSTRUCTOR_DASHBOARD;
		} else {
			return Routes.ORGANIZATION_DASHBOARD;
		}
	}
}

export default HeaderBru;

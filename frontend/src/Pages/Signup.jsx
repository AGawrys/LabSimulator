import React from 'react';
import title from '../Styles/Images/brü.svg';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/signup.css';
import { Redirect } from 'react-router-dom';
import Routes from '../utils/RouteConstants.js';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			email: '',
			password: '',
			errors: '',
			name: '',
			role: 'STUDENT',
			organizationEmail: '',
			display: false,
			error: ''
		};
	}

	handleRadioCheck = (e, role) => {
		this.setState({ role: role });
		this.setState({ display: false });
	};

	handleRadioCheck2 = (e, role) => {
		this.setState({ role: role });
		this.setState({ display: true });
	};

	handleFieldChange = (e, field) => {
		this.setState({ [field]: e.target.value });
	};

	handleSignUp = (e) => {
		const account = {
			email: this.state.email,
			name: this.state.name,
			password: this.state.password,
			role: this.state.role,
			organizationEmail: this.state.organizationEmail
		};
		e.preventDefault();

		axios.post(Routes.SERVER + '/createAccount', account).then(
			(response) => {
				console.log(response);
				this.setState({ redirect: true });
			},
			(error) => {
				this.setState({
					errors: 'Error signing up! Check email field(s).'
				});
			}
		);
	};

	render() {
		const { role } = this.state;
		if (this.state.redirect) {
			if (role === 'STUDENT') {
				return <Redirect exact to="/student/dashboard" />;
			} else {
				return <Redirect exact to="/instructor/dashboard" />;
			}
		} else {
			const errorMessage = this.state.errors;
			return (
				<div className="background-signup">
					<img src={title} className="Home-header-logo" style={{ height: '20vh' }} alt="logo" />

					<div className="box-container-signup">
						<form className="signup_form" onSubmit={this.handleSignUp}>
							<FormGroup controlId="formBasicText" bsSize="large">
								<label class="radio-inline signUpRadio">
									<input
										type="radio"
										name="optradio"
										required
										onChange={(e) => this.handleRadioCheck(e, 'STUDENT')}
									/>{' '}
									<label className="radioButtonUser">Student</label>
								</label>
								<label class="radio-inline signUpRadio">
									<input
										type="radio"
										name="optradio"
										onChange={(e) => this.handleRadioCheck2(e, 'INSTRUCTOR')}
									/>
									<label className="radioButtonUser">Instructor</label>
								</label>
								<label class="radio-inline signUpRadio">
									<input
										type="radio"
										name="optradio"
										onChange={(e) => this.handleRadioCheck(e, 'ORGANIZATION')}
									/>
									<label className="radioButtonUser">Organization</label>
								</label>
							</FormGroup>
							<FormGroup controlId="formBasicText" bsSize="large">
								<FormControl
									autoFocus
									type="text"
									placeholder="Name"
									onChange={(e) => this.handleFieldChange(e, 'name')}
									required
								/>
							</FormGroup>
							<FormGroup controlId="formBasicText" bsSize="large">
								<FormControl
									autoFocus
									type="email"
									placeholder="Email"
									onChange={(e) => this.handleFieldChange(e, 'email')}
									required
								/>
							</FormGroup>
							<FormGroup controlId="password" bsSize="large">
								<FormControl
									onChange={(e) => this.handleFieldChange(e, 'password')}
									type="password"
									placeholder="Password"
									required
								/>
							</FormGroup>
							<FormGroup
								className={this.state.display ? '' : 'hide-tag'}
								controlId="formBasicText"
								bsSize="large"
							>
								<FormControl
									onChange={(e) => this.handleFieldChange(e, 'organizationEmail')}
									type="email"
									placeholder="Organization Email"
								/>
							</FormGroup>
							<p style={{ color: 'red' }}> {errorMessage}</p>
							<Button style={{ backgroundColor: '#4F3E31' }} block bsSize="large" type="submit">
								Sign Up
							</Button>
						</form>
					</div>
				</div>
			);
		}
	}
}

export default Signup;

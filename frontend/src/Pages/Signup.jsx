import React from 'react';
import title from '../Styles/Images/brü.svg';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/signup.css';
import { Redirect } from 'react-router-dom';

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
			error: ''
		};
	}

	handleRadioCheck = (e, role) => {};

	handleFieldChange = (e, field) => {
		this.setState({ [field]: e.target.value });
		console.log(this.state.role);
	};

	handleSignUp = (e) => {
		const account = {
			email: this.state.email,
			name: this.state.name,
			password: this.state.password,
			role: this.state.role
		};
		e.preventDefault();

		axios.post('http://localhost:8080/createAccount', account).then(
			(response) => {
				console.log(response);
				this.setState({ redirect: true });
			},
			(error) => {
				this.setState({
					errors: 'Error signing up! Try a different email'
				});
			}
		);
	};

	render() {
		if (this.state.redirect) {
			return <Redirect exact to="/studentdashboard" />;
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
									/>Student
								</label>
								<label class="radio-inline signUpRadio">
									<input
										type="radio"
										name="optradio"
										onChange={(e) => this.handleRadioCheck(e, 'INSTRUCTOR')}
									/>Instructor
								</label>
								<label class="radio-inline signUpRadio">
									<input
										type="radio"
										name="optradio"
										onChange={(e) => this.handleRadioCheck(e, 'ORGANIZATION')}
									/>Organization
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
									type="text"
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

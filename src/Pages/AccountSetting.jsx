import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AccountSetting.css';
import HeaderBru from '../Components/Header.jsx';
import title from '../Styles/Images/brü.svg';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import '../Styles/signup.css';
export default class AccountSetting extends Component {
	todo() {}
	handleNext() {}
	render() {
		return (
			<div className="background">
				<HeaderBru
				third='Home'
				link3="/Home"
				btn='Exit'
				link4="/Home"
				color= '#01AFD8'
				clickHeaderBtn={this.handleNext.bind(this)}
				/>
				<div className="background-signup">
                    <img src={title} className="Home-header-logo" style={{ paddingLeft: '25%', height: '20vh', }} alt="logo" />

            <div className="box-container-signup">
            <form className="signup_form" onSubmit={this.todo()}>
							<FormGroup controlId="formBasicText" bsSize="large">
								<FormControl
									autoFocus
									type="text"
									placeholder="Company"
									onChange={(e) => this.todo()}
									required
								/>
							</FormGroup>
							<FormGroup controlId="password" bsSize="large">
								<FormControl
									onChange={(e) => this.todo()}
									type="password"
									placeholder="Password"
									required
								/>
							</FormGroup>
							<FormGroup controlId="password" bsSize="large">
								<FormControl
									onChange={(e) => this.todo()}
									type="password"
									placeholder="Confirm Password"
									required
								/>
							</FormGroup>
                            <Link to="/StudentDashboard" className="link">
							<Button style={{ backgroundColor: '#4F3E31' }} block bsSize="large" type="submit">
								SUBMIT
							</Button>
                            </Link>
						</form>
                        </div>
                        </div>
			</div>
		);
	}
}

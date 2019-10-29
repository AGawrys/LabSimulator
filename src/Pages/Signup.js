import React from 'react';  
import title from '../Styles/Images/brü.svg';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Styles/signup.css';

class Signup extends React.Component {
    
    todo() {}
    render() {
        return (
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
                            <FormGroup controlId="formBasicText" bsSize="large">
								<FormControl
									autoFocus
									type="text"
									placeholder="Username"
									onChange={(e) => this.todo()}
									required
								/>
							</FormGroup>
                            <FormGroup controlId="formBasicText" bsSize="large">
								<FormControl
									autoFocus
									type="text"
									placeholder="Email"
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
                            <Link to="/StudentDashboard" className="link">
							<Button style={{ backgroundColor: '#4F3E31' }} block bsSize="large" type="submit">
								Sign Up
							</Button>
                            </Link>
						</form>
                        </div>
                        </div>
        )
    }
}

export default Signup;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AccountSetting.css';

export default class AccountSetting extends Component {
	render() {
		return (
			<div className="background">
				<div className="changePasswordDiv">
					<h3>Change Password</h3>
					<form className="passwordForm">
						Current Password:<br />
						<input type="password" name="current password" />
						<br />
						New Password:<br />
						<input type="password" name="new password" />
						<br />
						<Link to="/StudentDashboard">
							<input className="btn btn-primary" type="submit" value="Submit" />
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

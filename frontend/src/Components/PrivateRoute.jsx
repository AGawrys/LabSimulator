import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import Routes from '../utils/RouteConstants.js';
import GeneralConstants from '../utils/GeneralConstants.js';

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isAuthenticated: true,
			email: null,
			role: 'STUDENT'
		};
	}

	componentDidMount() {
		this.authenticate();
	}

	render() {
		if (this.state.loading) {
			return null;
		}
		if (!this.state.isAuthenticated) {
			return <Redirect exact to={Routes.DEFAULT} />;
		}
		const Component = this.props.component;
		const expectedRole = this.props.role;
		const {email, role} = this.state;
		if (expectedRole != GeneralConstants.NO_ROLE && expectedRole != role) {
			return <Redirect exact to={Routes.NOT_FOUND}/>
		}
		return <Component {...this.props} email={email} role={role}/>;
	}

	authenticate() {
		if (!localStorage.hasOwnProperty('token')) {
			this.setState({
				loading: false,
			});
		}
		axios
			.post(
				Routes.SERVER + 'token-auth',
				localStorage.getItem('token')
			)
			.then(
				(res) => {
					const {email, role} = res.data;
					this.setState({
						loading: false,
						isAuthenticated: true,
						email: email,
						role: role,
					});
				},
				(err) => {
					this.setState({
						loading: false
					});
				}
			);
	}
}

export default PrivateRoute;
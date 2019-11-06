import React, { Component } from 'react';
import SearchBar from 'react-js-search';
import Collapsible from 'react-collapsible';
import '../Styles/InstructorDashboard.css';
import { Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';

const links = {
	Account: "/account",
}

export class InstructorDashboard extends Component {

	handleNext(){}
	render() {
		return (
			<div className="background">
				<HeaderBru 
          			home={Routes.INSTRUCTOR_DASHBOARD} 
          			isLoggedIn={true} 
          			links={links}
        		/>
				<div className="teacherDashboard">
					<div className="searchBarDiv">
						<SearchBar placeHolderText={'Search for Lesson'} />
					</div>
					<div className="teacherDashboardContents">
						<div className="recentDrinksDiv">
							<div className="recentDrinkTop">
								<h4>Recent Lessons</h4>
								<Link to="/Editor" className="link">
								<button className="buttonRound btn-primary">+</button>
								</Link>
							</div>
							<div className="recentDrinkBottom">
								<ol>
									<li>
										Caramel Latte{' '}
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>1. Get</li>
												<li>2. Drink</li>
												<li>3. Done</li>
											</ol>
										</Collapsible>
									</li>
									<li className="oddDiv">
										Strawberry Green Tea
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>1. Get</li>
												<li>2. Drink</li>
												<li>3. Done</li>
											</ol>
										</Collapsible>
									</li>

									<li>
										Mocha Frappuccino
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>1. Get</li>
												<li>2. Drink</li>
												<li>3. Done</li>
											</ol>
										</Collapsible>
									</li>
								</ol>
							</div>
						</div>
						<div className="recentLessonsDiv">
							<div className="recentLessonsTop">
								<h4>Recent Courses</h4>
								<Link to="/course" className="link">
								<button className="buttonRound btn-primary">+</button>
								</Link>
							</div>
							<div className="recentLessonsBottom">
								<div className="training1">
									<div className="training1Header">
										<h5>Training 1</h5>
										<h6>(3 Drinks)</h6>
									</div>

									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li>Caramel Latte</li>
											<li>Strawberry Green Tea</li>
											<li>Mocha Frappuccino</li>
										</ol>
									</Collapsible>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default InstructorDashboard;

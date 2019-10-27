import React, { Component } from 'react';
import SearchBar from 'react-js-search';
import Collapsible from 'react-collapsible';
import '../Styles/TeacherDashboard.css';

export class TeacherDashboard extends Component {
	render() {
		return (
			<div className="teacherDashboard">
				<div className="searchBarDiv">
					<SearchBar placeHolderText={'Search for Lesson'} />
				</div>
				<div className="teacherDashboardContents">
					<div className="recentDrinksDiv">
						<div className="recentDrinkTop">
							<h4>Recent Drinks</h4>
							<button>Add Drink</button>
						</div>
						<div className="recentDrinkBottom">
							<ol>
								<li>Caramel Latte</li>
								<li>Strawberry Green Tea</li>
								<li>Mocha Frappuccino</li>
							</ol>
						</div>
						<button className="allCreationButton">All Creations</button>
					</div>
					<div className="recentLessonsDiv">
						<div className="recentLessonsTop">
							<h4>Recent Lessons</h4>
							<button>Add Lesson</button>
						</div>
						<div className="recentLessonsBottom">
							<div className="training1">
								<div className="training1Header">
									<h4>Training 1</h4>
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
						<button className="allLessonsButton">All Lessons</button>
					</div>
				</div>
			</div>
		);
	}
}

export default TeacherDashboard;

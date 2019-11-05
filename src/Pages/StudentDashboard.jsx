import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import { Link } from 'react-router-dom';

export class StudentDashboard extends Component {
	render() {
		return (
			<div className="background">
				<div className="studentDashboard">
					<div className="welcomeStudentDiv">
						<h3>Welcome Student!</h3>
						<Link to="/AccountSetting">
							<h5>Change Account Setting</h5>
						</Link>
					</div>
					<div className="studentDashboardContents">
						<div className="studentRecentLesson">
							<h4>Recent Courses</h4>
							<div className="studentAllLesson">
								<ol>
									<li className="courseListing">
										<h5>Training1</h5>
										<h6>Instructor: John Smith</h6>
										<h6>Completed</h6>
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>Pumpkin Spice Latte (Completed)</li>
												<li>Chai Tea Latte (Completed)</li>
												<li>Maple Pecan Latte (Completed)</li>
											</ol>
										</Collapsible>
									</li>
									<li className="courseListing oddDiv">
										<h5>Fall Seasonals 2019</h5>
										<h6>Instructor: John Smith</h6>
										<h6>2/3 Labs</h6>
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>Pumpkin Spice Latte (Completed)</li>
												<li>Chai Tea Latte (Completed)</li>
												<li>Maple Pecan Latte (Uncompleted)</li>
											</ol>
										</Collapsible>
									</li>
									<li className="courseListing">
										<h5>Zombie Frappuccino</h5>
										<h6>Instructor: John Smith</h6>
										<h6>Completed</h6>
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>Pumpkin Spice Latte (Completed)</li>
												<li>Chai Tea Latte (Completed)</li>
												<li>Maple Pecan Latte (Completed)</li>
											</ol>
										</Collapsible>
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StudentDashboard;

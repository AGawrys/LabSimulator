import React, { Component } from 'react';
import SearchBar from 'react-js-search';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import { Link } from 'react-router-dom';


class CoursePage extends Component {
	render() {
		return (
			<div className="background">
				<div className="studentDashboard">
					<div className="welcomeStudentDiv">
						<h3> Fall Seasonals 2019 </h3>
						<h5> Access Code: 4x8Y5 </h5>
					</div>
				</div>
				<div className="studentDashboardContents">
					<div className="studentRecentLesson">
						<h4> Lessons </h4>
						<div className="studentAllLesson">
							<ol>
								<li className="courseListing">
									<h5> Chai Tea Latte </h5>
									<h6> 3/4 Students </h6>
									<button className="deleteButton"> Delete</button>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li> James Angeles (Completed) 1 Attempt </li>
											<li> Steven Kuang </li>
											<li> Agnieszka Gawrys (Completed) 2 Attempts</li>
											<li> Jason Dong (Completed) 2 Attempts</li>
										</ol>
									</Collapsible>
								</li>
								<li className="courseListing">
									<h5> Pumpkin Spice Latte </h5>
									<h6> 3/4 Students </h6>
									<button className="deleteButton"> Delete</button>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li> James Angeles (Completed) 3 Attempts </li>
											<li> Steven Kuang </li>
											<li> Agnieszka Gawrys (Completed) 1 Attempt</li>
											<li> Jason Dong (Completed) 2 Attempts</li>
										</ol>
									</Collapsible>
								</li>
								<li className="courseListing">
									<h5> Maple Pecan Latte </h5>
									<h6> 3/4 Students </h6>
									<button className="deleteButton"> Delete</button>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li> James Angeles (Completed) 5 Attempts </li>
											<li> Steven Kuang </li>
											<li> Agnieszka Gawrys (Completed) 2 Attempts</li>
											<li> Jason Dong (Completed) 3 Attempts</li>
										</ol>
									</Collapsible>
								</li>
							</ol>
						</div>
					</div>
				</div>
				<div className="teacherDashboardContents">
						<div className="recentDrinksDiv">
							<div className="recentDrinkTop">
								<h4>Instructors</h4>
								<button className="buttonRound btn-primary">+</button>
							</div>
							<div className="recentDrinkBottom">
								<ol>
									<li> 
										<div className="listRow">
											<p> Richard McKenna </p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
									<li> 
										<div className="listRow">
											<p> Eugene Stark </p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
									<li> 
										<div className="listRow">
											<p> Kevin McDonnell </p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
								</ol>
							</div>
						</div>
						<div className="recentLessonsDiv">
							<div className="recentLessonsTop">
								<h4>Students</h4>
								<button className="buttonRound btn-primary">+</button>
							</div>
							<div className="recentDrinkBottom">
								<ol>
									<li> 
										<div className="listRow">
											<p> James Angeles </p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
									<li> 
										<div className="listRow">
											<p> Steven Kuang </p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
									<li> 
										<div className="listRow">
											<p> Agnieszka Gawrys </p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
									<li> 
										<div className="listRow">
											<p>Jason Dong</p>
											<button className="buttonRound btn-danger">-</button>
										</div>
									</li>
								</ol> 
							</div>
						</div>
					</div>
			</div>
		);
	}
}

export default CoursePage;
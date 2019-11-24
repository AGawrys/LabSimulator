import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import { Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import { Row, Button } from 'react-bootstrap';
import { Container, Grid, Col } from 'react-grid-system';
import { Redirect } from 'react-router-dom';
import { getCourses } from '../Validation/StudentEditorValidation.js';

export class StudentDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			goTolab: false,
			courses : getCourses(),
		};
	}

    handleStartLab() {
		this.setState({ goToLab: true});
	}

	render() {
		const {goToLab, courses} = this.state;
		if(goToLab){
			return <Redirect exact to="/student/editor" />;
		}


		return (
			<div className="background">
				<HeaderBru home={Routes.STUDENT_DASHBOARD} isLoggedIn={true} />
				/>
				<div className="studentDashboard">
					<div className="studentDashboardContents">
						<div className="studentRecentLesson">
							<Row className="headingRow">
								<h4>Recent Courses</h4>
							</Row>
							<div className="studentAllLesson">
								<ol>
									<li className="courseListing">
										<Row>
											<Col>
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
											</Col>
											<Col>
											<Button
												style={{ backgroundColor: 'black', width: '40vh', justifySelf: 'flex-end' }}
												onClick={this.handleStartLab.bind(this)}
												block
												bsSize="small"
												type="button"
											>
												NEXT STEP
											</Button>
											</Col>

										</Row>
										
									</li>
									<li className="courseListing oddDiv">
										<h5>Fall Seasonals 2019</h5>
										<h6>Instructor: John Smith</h6>
										<h6>2/3 Lessons</h6>
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

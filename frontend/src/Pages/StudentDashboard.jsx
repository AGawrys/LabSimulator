import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import { Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import { Row, Button, Card} from 'react-bootstrap';
import { Container, Grid, Col } from 'react-grid-system';
import { Redirect } from 'react-router-dom';
import { getCourses } from '../Validation/StudentEditorValidation.js';

const statusColor=['white', '#f7f5da', '#d8f2dd'];
const status=["Incomplete", "In progress", "Complete" ];
const statusBtn=["START", "CONTINUE", "REDO"];
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
				
				<div className="studentDashboard">
					<div className="studentDashboardContents">
						<Card>
						<div className="studentRecentLesson">
							<Card.Header>
								<h4>Recent Courses</h4>
							</Card.Header>
							<div className="studentAllLesson">
								<ol>
								{courses.map((course, i) => (
									<li className="courseListing" style={{ backgroundColor: statusColor[course.status]}}>
										<Row>
											<Col>
										<h5>{course.name}</h5>
										<h6>Instructor: {course.instructor}</h6>
										<h6>Status: {status[course.status]}</h6>
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												{course.lessons.map((lesson, j) =>(
													<li>{lesson.name} (Completed)</li>
												))}
											</ol>
										</Collapsible>
											</Col>
											<Col>
											<Button
												style={{ backgroundColor: 'black', width: '20vh', justifySelf: 'flex-end' }}
												onClick={this.handleStartLab.bind(this)}
												block
												bsSize="small"
												type="button"
											>
												{statusBtn[course.status]}
											</Button>
											</Col>

										</Row>
										
									</li>)
								)}
								</ol>
							</div>
							
						</div>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

export default StudentDashboard;

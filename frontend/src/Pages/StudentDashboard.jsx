import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import { Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import { Row, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const links = {
	Dashboard: Routes.STUDENT_DASHBOARD,
};

const statusColor = [ 'white', '#f7f5da', '#d8f2dd' ];
const status = [ 'Incomplete', 'In progress', 'Complete' ];
const statusBtn = [ 'START', 'CONTINUE', 'REDO' ];
export class StudentDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courseProgresses: null
		};
	}

	componentDidMount() {
		const { email } = this.props;
		axios
			.get(Routes.SERVER + '/getStudentAssignments/' + email)
			.then((response) => this.setState({ courseProgresses: response.data }), (error) => console.log(error));
	}

	render() {
		const { courseProgresses } = this.state;
		if (courseProgresses === null) {
			return null;
		}

		return (
			<div className="background">
				<HeaderBru home={Routes.STUDENT_DASHBOARD} isLoggedIn={true} links={links} />
				<div className="studentDashboard">
					<div className="studentDashboardContents">
						<Card>
							<div className="studentRecentLesson">
								<Row className="headingRow">
									<h4>My Courses</h4>
								</Row>
								<div className="studentAllLesson">
									<ListGroup>
										{courseProgresses.map((progress, index) => (
											<StudentCourse
												key={index}
												course={progress.course}
												lessons={progress.lessonProgress}
												onLessonClick={this.navigateToStudentLesson}
											/>
										))}
									</ListGroup>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	navigateToStudentLesson = (courseId, lessonId) => {
		const newRoute = Routes.STUDENT_EDITOR + courseId + '/' + lessonId;
		this.props.history.push(newRoute);
	};
}

function StudentCourse(props) {
	const { course, lessons, onLessonClick } = props;
	const courseComponent = (
		<ListGroup.Item variant="primary">
			{' '}
			{course.name} <i className ="fa fa-chevron-down right collapse-button" aria-hidden="true"></i>
		</ListGroup.Item>
	);
	const collapse = (
		<ListGroup.Item variant="primary">
			{' '}
			{course.name} <i className ="fa fa-chevron-up right collapse-button" aria-hidden="true"></i>
		</ListGroup.Item>
	);
	let nextOneToComplete = true;
	return (
		<Collapsible open trigger={courseComponent} triggerWhenOpen={collapse}>
			<ListGroup>
				{lessons.map((lessonProgress, index) => {
					const canComplete = lessonProgress.completed || nextOneToComplete;
					if (!lessonProgress.completed && nextOneToComplete) {
						nextOneToComplete = false;
					}
					return (
						<StudentLesson
							key={index}
							course={course}
							lessonProgress={lessonProgress}
							disabled={!canComplete}
							onClick={onLessonClick}
						/>
					);
				})}
			</ListGroup>
		</Collapsible>
	);
}

function StudentLesson(props) {
	const { lessonProgress, disabled, onClick, course } = props;
	const { lesson, completed, numAttempts } = lessonProgress;

	const completeString = completed ? 'Completed' : 'Not Completed';
	const className = completed ? 'completed-lesson' : '';
	const icon = completed ? <i className="fa fa-check" aria-hidden="true"></i> : null;
	return (
		<ListGroup.Item
			as="button"
			action
			style={{ textAlign: 'left' }}
			disabled={disabled}
			onClick={() => onClick(course.courseId, lesson.lessonId)}
		>
			<div className="search-result-header">
				<strong>
					<p> {lesson.name} </p>
				</strong>
				<p className={className} style={{ textAlign: 'right' }}> {icon} {completeString} ({numAttempts} attempts) </p>
			</div>
		</ListGroup.Item>
	);
}

export default StudentDashboard;

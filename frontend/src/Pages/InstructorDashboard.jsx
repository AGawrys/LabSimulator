import React, { Component } from 'react';
import SearchBar from 'react-js-search';
import Collapsible from 'react-collapsible';
import '../Styles/InstructorDashboard.css';
import { Redirect, Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import FormModal from '../Components/FormModal.jsx';
import { Button, Form, Modal, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import CourseRow from '../Components/CourseRow.jsx';
import LessonRow from '../Components/LessonRow.jsx';

const links = {
	Account: '/account'
};

export class InstructorDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCourseModal: false,
			showLessonModal: false,
			createdCourseName: null,
			createdCourseDescription: null,
			createdLessonName: null,
			instructorInfo: {},
			loaded: false
		};
	}

	componentDidMount() {
		const { email } = this.props;
		axios.get(Routes.SERVER + 'getInstructor/' + email).then(
			(response) => this.onInstructorInfoResponse(response),
			(error) => {
				console.log(error);
			}
		);
	}

	render() {
		const { instructorInfo, loaded } = this.state;
		if (!loaded) {
			return null;
		}
		const { courses, lessons } = instructorInfo;
		return (
			<div className="background">
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<div className="teacherDashboard">
					<div className="searchBarDiv">
						<SearchBar placeHolderText={'Search for Lesson'} />
					</div>
					<div className="teacherDashboardContents">
						<div className="recentDrinksDiv">
							<div className="recentDrinkTop">
								<h4>My Lessons</h4>
								<button
									className="buttonRound btn-primary"
									onClick={() => {
										this.setState({ showLessonModal: true });
									}}
								>
									+
								</button>
								<FormModal
									title="Create Lesson"
									show={this.state.showLessonModal}
									onHide={() => {
										this.setState({ showLessonModal: false });
									}}
									submitAction={this.onCreateLesson}
								>
									{this.getLessonForm()}
								</FormModal>
							</div>
							<div className="recentDrinkBottom">
								<ListGroup>
									{lessons.map((lesson, index) => (
										<LessonRow {...this.props} key={index} lesson={lesson} canDelete={false} />
									))}
								</ListGroup>
							</div>
						</div>
						<div className="recentLessonsDiv">
							<div className="recentLessonsTop">
								<h4>My Courses</h4>
								<button
									className="buttonRound btn-primary"
									onClick={() => {
										this.setState({ showCourseModal: true });
									}}
								>
									+
								</button>
								<FormModal
									title="Create Course"
									show={this.state.showCourseModal}
									onHide={() => {
										this.setState({ showCourseModal: false });
									}}
									submitAction={this.onCreateCourse}
								>
									{this.getCourseForm()}
								</FormModal>
							</div>
							<div className="recentLessonsBottom">
								<ListGroup>
									{courses.map((course, index) => (
										<CourseRow {...this.props} key={index} course={course} />
									))}
								</ListGroup>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	onCreateCourse = (e) => {
		e.preventDefault();
		const { createdCourseName, createdCourseDescription } = this.state;
		const course = {
			name: createdCourseName,
			description: createdCourseDescription
		};
		const body = {
			email: this.props.email,
			course: course
		};
		axios.post(Routes.SERVER + 'createCourse', body).then(
			(response) => {
				this.navigateToCreatedCourse(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	onCreateLesson = (e) => {
		e.preventDefault();
		const { createdLessonName } = this.state;
		const body = {
			name: createdLessonName,
			instructorEmail: this.props.email
		};
		axios.post(Routes.SERVER + 'addLesson', body).then(
			(response) => {
				this.navigateToCreatedLesson(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	onInstructorInfoResponse = (response) => {
		const { courses, lessons } = response.data;
		this.setState({
			loaded: true,
			instructorInfo: {
				courses: courses,
				lessons: lessons
			}
		});
	};

	navigateToCreatedCourse = (data) => {
		const { courseCode } = data;
		const newRoute = Routes.COURSE + courseCode;
		this.props.history.push(newRoute);
	};

	navigateToCreatedLesson = (lessonId) => {
		const newRoute = Routes.INSTRUCTOR_EDITOR + lessonId;
		this.props.history.push(newRoute);
	};

	getCourseForm() {
		return (
			<div>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Course Name</Form.Label>
						<Form.Control
							minlength="5"
							required
							placeholder="Enter Course Name"
							onChange={(e) => this.handleFieldChange(e, 'createdCourseName')}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							maxLength="140"
							as="textarea"
							rows="3"
							onChange={(e) => this.handleFieldChange(e, 'createdCourseDescription')}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit">
						Create
					</Button>
				</Modal.Footer>
			</div>
		);
	}

	getLessonForm() {
		return (
			<div>
				<Modal.Body>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Lesson Name</Form.Label>
						<Form.Control
							minLength="3"
							required
							placeholder="Enter Lesson Name"
							onChange={(e) => this.handleFieldChange(e, 'createdLessonName')}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit">
						Create
					</Button>
				</Modal.Footer>
			</div>
		);
	}

	handleFieldChange = (e, field) => {
		this.setState({ [field]: e.target.value });
	};
}

export default InstructorDashboard;

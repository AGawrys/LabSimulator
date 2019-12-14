import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import FormModal from '../Components/FormModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import AddSearchModal from '../Components/AddSearchModal.jsx';
import InstructorRow from '../Components/InstructorRow.jsx';
import LessonRow from '../Components/LessonRow.jsx';
import RemoveButton from '../Components/RemoveButton.jsx';
import { Button, Modal, Form, Row, ListGroup } from 'react-bootstrap';
import GeneralConstants from '../utils/GeneralConstants.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const links = {
	Dashboard: Routes.INSTRUCTOR_DASHBOARD,
};

class CoursePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDeleteInstructor: false,
			showDeleteStudent: false,
			showDeleteLesson: false,
			showDeleteCourse: false,
			showAddLessonsModal: false,
			showAddStudentsModal: false,
			showAddInstructorsModal: false,
			selectedLesson: null,
			selectedStudent: null,
			selectedInstructor: null,
			courseInfo: null,
			instructorLessons: null
		};
	}

	componentDidMount() {
		this.fetchAllInformation();
	}

	render() {
		const {showAddLessonsModal, showAddStudentsModal, showDeleteInstructor, instructorLessons} = this.state;
		const { showDeleteStudent, courseInfo, showDeleteLesson,showAddInstructorsModal, showDeleteCourse} = this.state;
		if (courseInfo === null || instructorLessons === null) {
			return null;
		}
		if (!this.teachesClass()) {
			return <Redirect exact to={Routes.NOT_FOUND}/>
		}
		const {selectedStudent, selectedInstructor, selectedLesson} = this.state;
		const {title, accessCode, courseStudents, courseInstructors, lessons, potentialStudents, potentialInstructors} = courseInfo;
		return (
			<div className="background">
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<ConfirmationModal
					title={GeneralConstants.REMOVE_INSTRUCTOR_TITLE}
					message={GeneralConstants.REMOVE_INSTRUCTOR_MESSAGE}
					onHide={() => this.setState({showDeleteInstructor: false})}
					show={showDeleteInstructor}
					onDelete={() => this.deleteAccount(selectedInstructor, "deleteInstructorCourse")}/>
				<ConfirmationModal
					title={GeneralConstants.REMOVE_STUDENT_TITLE}
					message={GeneralConstants.REMOVE_STUDENT_MESSAGE}
					onHide={() => this.setState({showDeleteStudent: false})}
					show={showDeleteStudent}
					onDelete={() => this.deleteAccount(selectedStudent, "deleteStudentCourse")}/>
				<ConfirmationModal
					title={GeneralConstants.REMOVE_LESSON_TITLE}
					message={GeneralConstants.REMOVE_LESSON_MESSAGE}
					onHide={() => this.setState({showDeleteLesson: false})}
					show={showDeleteLesson}
					onDelete={this.deleteLesson}/>
				<ConfirmationModal
					title={GeneralConstants.DELETE_COURSE_TITLE}
					message={GeneralConstants.DELETE_COURSE_MESSAGE}
					onHide={() => this.setState({showDeleteCourse: false})}
					show={showDeleteCourse}
					onDelete={this.deleteCourse}
				/>
				<AddSearchModal
					actionRoute={Routes.SERVER + "/addLessons"}
					param={accessCode}
					items={instructorLessons}
					show={showAddLessonsModal}
					title={GeneralConstants.ADD_LESSON_TITLE}
					onHide={() => this.setState({showAddLessonsModal: false})}
					onSuccessfulAdd={this.fetchAllInformation}
				/>
				<AddSearchModal
					actionRoute={Routes.SERVER + "/enrollStudents"}
					param={accessCode}
					items={potentialStudents}
					show={showAddStudentsModal}
					title={GeneralConstants.ADD_STUDENT_TITLE}
					onHide={() => this.setState({showAddStudentsModal: false})}
					onSuccessfulAdd={this.getCourse}
				/>
				<AddSearchModal
					actionRoute={Routes.SERVER + "/addCourseInstructors"}
					param={accessCode}
					items={potentialInstructors}
					show={showAddInstructorsModal}
					title={GeneralConstants.ADD_INSTRUCTOR_TITLE}
					onHide={() => this.setState({showAddInstructorsModal: false})}
					onSuccessfulAdd={this.getCourse}
				/>
				<div className="studentDashboard">
					<div className="welcomeStudentDiv">
						<h3> {title}  </h3>
						<Button variant="danger" onClick={() => this.setState({showDeleteCourse:true})}>
							Delete Course
						</Button>
					</div>
				</div>
				<div className="studentDashboardContents">
					<div className="studentRecentLesson">
						<div className="recentDrinkTop containerHeaderDiv">
							<h4> Lessons </h4>
							<button
								className="buttonRound btn-primary instructorAddLessonButton"
								onClick={() => {
									this.setState({ showAddLessonsModal: true });
								}}
							>
								+
							</button>
						</div>
						<div className="studentAllLesson">
							<ListGroup>
								{lessons.map((lesson, index) => 
									<LessonRow {...this.props} key={index} lesson={lesson} canDelete={true} 
										onClick={(e) => this.onLessonClick(e,lesson)}
									/>)
								}
							</ListGroup>
						</div>
					</div>
				</div>
				<div className="teacherDashboardContents">
					<div className="recentDrinksDiv">
						<div className="recentDrinkTop">
							<h4>Instructors</h4>
							<button 
								className="buttonRound btn-primary"
								onClick={() => this.setState({showAddInstructorsModal: true})}
							>+</button>
						</div>
						<div className="recentDrinkBottom">
							<ListGroup>
								{courseInstructors.map((instructor,index) => 
									<InstructorRow 
										disabled={courseInstructors.length == 1} 
										key={index} 
										instructor={instructor} 
										onClick={() => this.onInstructorClick(instructor)}/>)
								}
							</ListGroup>
						</div>
					</div>
					<div className="recentLessonsDiv">
						<div className="recentLessonsTop">
							<h4>Students</h4>
							<button 
								className="buttonRound btn-primary" 
								onClick={()=> this.setState({showAddStudentsModal: true})}>
								+
							</button>
						</div>
						<div className="recentDrinkBottom">
							<ListGroup>
								{courseStudents.map((student, index) => this.renderStudent(student, index))}
							</ListGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}

	fetchAllInformation = () => {
		this.getCourse();
		this.getInstructorLessons();
	}

	getCourse = () => {
		const {course_id} = this.props.computedMatch.params;
		axios.get(Routes.SERVER + "getCourse/" + course_id).then(
			(response) => this.parseCourseResponse(response),
			(error) => console.log(error)
		);
	}

	getInstructorLessons = () => {
		const {course_id} = this.props.computedMatch.params;
		const body = {
			courseId: course_id,
			instructorEmail: this.props.email,
		};
		axios.post(Routes.SERVER + "/getPotentialLessons", body).then(
			(response) => this.parseLessonResponse(response),
			(error) => console.log(error),
		);
	}

	parseCourseResponse = (response) => {
		let {course, courseInstructors, courseStudents, potentialInstructors, potentialStudents, courseLessons} = response.data;
		potentialInstructors = this.parseSearchResults(potentialInstructors);
		potentialStudents = this.parseSearchResults(potentialStudents);

		const courseInfo = {
			accessCode: course.courseId,
			title: course.name,
			description: course.description,
			courseInstructors: courseInstructors,
			courseStudents: courseStudents,
			potentialInstructors: potentialInstructors,
			potentialStudents:potentialStudents,
			lessons: courseLessons,
		}
		this.setState({
			courseInfo: courseInfo
		});
	}

	parseLessonResponse = (response) => {
		const potentialLessons = response.data;
		const parsedLessons = potentialLessons.map((lesson, index) => {
			return {id: index, label: lesson.name, data: lesson.lessonId}
		});
		console.log(response.data);
		this.setState({
			instructorLessons: parsedLessons,
		});
	}

	parseSearchResults = (accounts) => {
		return accounts.map((account, index) => { 
			return {id: index, label: account.name + " (" + account.email + ")", data: account.email}
		});
	}

	renderStudent = (student, index) =>  {
		return (
			<ListGroup.Item key={index}>
				<div className="listRow">
					<p> {student.name} </p>
					<RemoveButton onClick={() => {
							this.setState({ showDeleteStudent: true, selectedStudent: student});
					}}/>
				</div>
			</ListGroup.Item>
		);

	}

	onLessonClick = (e, lesson) => {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		this.setState({
			showDeleteLesson: true,
			selectedLesson: lesson,
		});
	}

	onInstructorClick = (instructor) =>  {
		this.setState({
			showDeleteInstructor: true,
			selectedInstructor: instructor,
		});
	}

	handleDelete = (e) => {
		e.preventDefault();
		this.setState({ showConfirmDeleteModal: false });
	};

	handleShowAllLessons = (e) => {
		e.preventDefault();
		this.setState({ showAllLessonsModal: false });
	};

	getShowAllLessons() {
		return (
			<div>
				<Modal.Body>
					<Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Lesson 1" />
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Lesson 2" />
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Lesson 3" />
						</Form.Group>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" className="btn btn-success">
						Add
					</Button>
					<Button variant="primary" type="submit" className="btn btn-danger">
						Cancel
					</Button>
				</Modal.Footer>
			</div>
		);
	}

	deleteAccount = (account, action) => {
		const {accessCode} = this.state.courseInfo;
		const body = {
			email: account.email,
			courseId: accessCode,
		};
		axios.post(Routes.SERVER + action, body).then(
			(response) => this.getCourse(),
			(error) => console.log(error)
		);
	}

	deleteLesson = () => {
		const {accessCode} = this.state.courseInfo;
		const {lessonId} = this.state.selectedLesson;
		const body = {
			courseId: accessCode,
			lessonId: lessonId
		};
		axios.post(Routes.SERVER + "deleteCourseLesson", body).then(
			(response) => this.fetchAllInformation(),
			(error) => console.log(error),
		);
	}

	deleteCourse = () => {
		const {accessCode} = this.state.courseInfo;
		axios.post(Routes.SERVER + "deleteCourse/" + accessCode, {}).then(
			(response) => this.props.history.push(Routes.INSTRUCTOR_DASHBOARD),
			(error) => console.log(error),
		);
	}

	teachesClass = () => {
		const {courseInstructors} = this.state.courseInfo;
		const {email} = this.props;
		for (let instructor of courseInstructors) {
			if (instructor.email === email) {
				return true;
			}
		}
		return false;
	}
}

export default CoursePage;

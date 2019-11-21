import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import FormModal from '../Components/FormModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import InstructorRow from '../Components/InstructorRow.jsx';
import LessonRow from '../Components/LessonRow.jsx';
import { Button, Modal, Form, Row, ListGroup } from 'react-bootstrap';
import GeneralConstants from '../utils/GeneralConstants.js';
import axios from 'axios';


const links = {
	Account: '/account'
};

class CoursePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDeleteInstructor: false,
			showDeleteStudent: false,
			showDeleteLesson: false,
			showAllLessonsModal: false,
			selectedLesson: null,
			selectedStudent: null,
			selectedInstructor: null,
			courseInfo: null,
		};
	}

	componentDidMount() {
		const {course_id} = this.props.computedMatch.params;
		axios.get(Routes.SERVER + "getCourse/" + course_id).then(
			(response) => this.parseCourseResponse(response),
			(error) => console.log(error)
		);
	}

	render() {
		const {showAllLessonsModal, showDeleteInstructor, showDeleteStudent, courseInfo, showDeleteLesson} = this.state;
		if (courseInfo === null) {
			return null;
		}

		const {title, accessCode, students, instructors, lessons} = courseInfo;
		return (
			<div className="background">
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<ConfirmationModal
					title={GeneralConstants.REMOVE_INSTRUCTOR_TITLE}
					message={GeneralConstants.REMOVE_INSTRUCTOR_MESSAGE}
					onHide={() => this.setState({showDeleteInstructor: false})}
					show={showDeleteInstructor}
					onDelete={this.deleteInstructor}/>
				<ConfirmationModal
					title={GeneralConstants.REMOVE_STUDENT_TITLE}
					message={GeneralConstants.REMOVE_STUDENT_MESSAGE}
					onHide={() => this.setState({showDeleteStudent: false})}
					show={showDeleteStudent}
					onDelete={this.deleteStudent}/>
				<ConfirmationModal
					title={GeneralConstants.REMOVE_LESSON_TITLE}
					message={GeneralConstants.REMOVE_LESSON_MESSAGE}
					onHide={() => this.setState({showDeleteLesson: false})}
					show={showDeleteLesson}
					onDelete={this.deleteLesson}/>
				<FormModal
					title="Adding Lesson"
					show={showAllLessonsModal}
					onHide={() => this.setState({ showAllLessonsModal: false })}
					submitAction={this.handleShowAllLessons}
				>
					{this.getShowAllLessons()}
				</FormModal>
				<div className="studentDashboard">
					<div className="welcomeStudentDiv">
						<h3> {title} </h3>
						<h5> {"Access Code: " + accessCode} </h5>
					</div>
				</div>
				<div className="studentDashboardContents">
					<div className="studentRecentLesson">
						<div className="recentDrinkTop containerHeaderDiv">
							<h4> Lessons </h4>
							<button
								className="buttonRound btn-primary instructorAddLessonButton"
								onClick={() => {
									this.setState({ showAllLessonsModal: true });
								}}
							>
								+
							</button>
						</div>
						<div className="studentAllLesson">
							<ListGroup>
								{lessons.map((lesson, index) => 
									<LessonRow key={index} lesson={lesson} onClick={this.onLessonClick}/>)
								}
							</ListGroup>
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
							<ListGroup>
								{instructors.map((instructor,index) => 
									<InstructorRow key={index} instructor={instructor} onClick={this.onInstructorClick}/>)
								}
							</ListGroup>
						</div>
					</div>
					<div className="recentLessonsDiv">
						<div className="recentLessonsTop">
							<h4>Students</h4>
							<button className="buttonRound btn-primary">+</button>
						</div>
						<div className="recentDrinkBottom">
							<ListGroup>
								{students.map((student, index) => this.renderStudent(student, index))}
							</ListGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}

	parseCourseResponse = (response) => {
		const {course, instructorAccounts, studentAccounts} = response.data;
		console.log(course);
		const courseInfo = {
			accessCode: course.courseId,
			title: course.name,
			description: course.description,
			instructors: instructorAccounts,
			students: studentAccounts,
			lessons: [],
		}
		this.setState({
			courseInfo: courseInfo
		})
	}

	renderStudent = (student, index) =>  {
		return (
			<ListGroup.Item key={index}>
				<div className="listRow">
					<p> {student.name} </p>
					<button
						className="buttonRound btn-danger"
						onClick={() => {
							this.setState({ showDeleteStudent: true, selectedStudent: student});
						}}
					>
						-
					</button>
				</div>
			</ListGroup.Item>
		);

	}

	onLessonClick = (lesson) => {
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
}

export default CoursePage;

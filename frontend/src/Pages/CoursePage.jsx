import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import FormModal from '../Components/FormModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import { Button, Modal, Form, Row, ListGroup } from 'react-bootstrap';

const links = {
	Account: '/account'
};

class CoursePage extends Component {
	constructor(props) {
		super(props);
		const courseInfo =  {
			accessCode: "4x8Y5",
			title: "Fall Seasonals 2019",
			students: [{name: "James Angeles"}, {name: "Nieszka Gawrys"}, {name: "Steven Kuang"}, {name: "Jason Dong"}],
			instructors: [{name: "Kevin McDonnell"}, {name: "Richard McKenna"},{name: "Eugene Stark"}],
			lessons: [{title: "Pumpkin Spice Latte"}, {title: "Caramel Frappuccino"}],
		}
		this.state = {
			showDeleteInstructor: false,
			showDeleteStudent: false,
			showDeleteLesson: false,
			showAllLessonsModal: false,
			courseInfo: courseInfo,
		};
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
					title="Remove Instructor"
					message="Are you sure you want to remove this instructor?"
					onHide={() => this.setState({showDeleteInstructor: false})}
					show={showDeleteInstructor}
					onDelete={this.deleteInstructor}/>
				<ConfirmationModal
					title="Remove Student"
					message="Are you sure you want to remove this student?"
					onHide={() => this.setState({showDeleteStudent: false})}
					show={showDeleteStudent}
					onDelete={this.deleteStudent}/>
				<ConfirmationModal
					title="Remove Lesson"
					message="Are you sure you want to remove this lesson?"
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
								{lessons.map((lesson) => this.renderLesson(lesson))}
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
								{instructors.map((instructor) => this.renderInstructor(instructor))}
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
								{students.map((student) => this.renderStudent(student))}
							</ListGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}



	renderLesson = (lesson) => {
		return (
			<ListGroup.Item>
				<h5> {lesson.title} </h5>
				<button
					className="deleteCourseButton buttonRound btn-danger"
					onClick={() => {
						this.setState({ showDeleteLesson: true, selectedLesson: lesson});
					}}
				>
					-
				</button>
			</ListGroup.Item>
		);

		/*
			<li className="courseListing">
				<h5> Maple Pecan Latte </h5>
				<h6> 3/4 Students </h6>
				<button
					className="deleteCourseButton buttonRound btn-danger"
					onClick={() => {
						this.setState({ showConfirmDeleteModal: true });
					}}
				>
					-
				</button>
				<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
					<ol>
						<li> James Angeles (Completed) 5 Attempts </li>
						<li> Steven Kuang </li>
						<li> Agnieszka Gawrys (Completed) 2 Attempts</li>
						<li> Jason Dong (Completed) 3 Attempts</li>
					</ol>
				</Collapsible>
			</li>
		*/
	}

	renderStudent = (student) =>  {
		return (
			<ListGroup.Item>
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

	renderInstructor = (instructor) => {
		return (
			<ListGroup.Item>
				<div className="listRow">
					<p> {instructor.name}</p>
					<button
						className="buttonRound btn-danger"
						onClick={() => {
							this.setState({ showDeleteInstructor: true, selectedInstructor: instructor});
						}}
					>
						-
					</button>
				</div>
			</ListGroup.Item>
		);
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

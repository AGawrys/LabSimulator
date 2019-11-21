import React, { Component } from 'react';
import SearchBar from 'react-js-search';
import Collapsible from 'react-collapsible';
import '../Styles/InstructorDashboard.css';
import { Redirect, Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import FormModal from '../Components/FormModal.jsx';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';


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
			courseInfo: null,
		};
	}

	render() {
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
								<h4>Recent Lessons</h4>
								<button
									className="buttonRound btn-primary"
									onClick={() => {
										this.setState({ showLessonModal: true });
									}}
								>
									+
								</button>
								<FormModal
									title="Create Course"
									show={this.state.showLessonModal}
									onHide={() => {
										this.setState({ showLessonModal: false });
									}}
								>
									{this.getLessonForm()}
								</FormModal>
							</div>
							<div className="recentDrinkBottom">
							</div>
						</div>
						<div className="recentLessonsDiv">
							<div className="recentLessonsTop">
								<h4>Recent Courses</h4>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	onCreateCourse = (e) => {
		e.preventDefault();
		const {createdCourseName, createdCourseDescription} = this.state;
		const course = {
			name: createdCourseName,
			description: createdCourseDescription
		}
		const body = {
			email: this.props.email,
			course: course,
		};
		axios.post(Routes.SERVER + "createCourse", body).then(
			(response) => {
				const courseCode = response.data;
				const newRoute = Routes.COURSE + courseCode;
				this.props.history.push(newRoute);
			},
			(error) => {
				console.log(error);
			}
		)
	} 

	getCourseForm() {
		return (
			<div>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Course Name</Form.Label>
						<Form.Control 
							minlength="5" 
							required placeholder="Enter Course Name"
							onChange={(e) => this.handleFieldChange(e, 'createdCourseName')}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control 
							maxLength="140" 
							as="textarea" 
							rows="3"
							onChange={(e) => this.handleFieldChange(e, 'createdCourseDescription')}/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" >
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
						<Form.Control minlength="5" required placeholder="Enter Lesson Name" />
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

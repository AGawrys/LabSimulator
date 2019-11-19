import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import '../Styles/StudentDashboard.css';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import FormModal from '../Components/FormModal.jsx';
import { Button, Modal, Form, Row } from 'react-bootstrap';

const links = {
	Account: '/account'
};

class CoursePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showConfirmDeleteModal: false,
			showAllLessonsModal: false,
			lessons: []
		};
	}

	handleDelete = (e) => {
		e.preventDefault();
		this.setState({ showConfirmDeleteModal: false });
	};

	getConfirmDelete() {
		return (
			<div>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Are you sure you want to remove this?</Form.Label>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" className="btn btn-success">
						Yes
					</Button>
					<Button variant="primary" type="submit" className="btn btn-danger">
						No
					</Button>
				</Modal.Footer>
			</div>
		);
	}

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
	
	render() {
		return (
			<div className="background">
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<FormModal
					title="Confirm Delete"
					show={this.state.showConfirmDeleteModal}
					onHide={() => this.setState({ showConfirmDeleteModal: false })}
					submitAction={this.handleDelete}
				>
					{this.getConfirmDelete()}
				</FormModal>
				<FormModal
					title="Adding Lesson"
					show={this.state.showAllLessonsModal}
					onHide={() => this.setState({ showAllLessonsModal: false })}
					submitAction={this.handleShowAllLessons}
				>
					{this.getShowAllLessons()}
				</FormModal>
				<div className="studentDashboard">
					<div className="welcomeStudentDiv">
						<h3> Fall Seasonals 2019 </h3>
						<h5> Access Code: 4x8Y5 </h5>
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
							<ol>
								<li className="courseListing">
									<h5> Chai Tea Latte </h5>
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
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
									</div>
								</li>
								<li>
									<div className="listRow">
										<p> Eugene Stark </p>
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
									</div>
								</li>
								<li>
									<div className="listRow">
										<p> Kevin McDonnell </p>
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
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
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
									</div>
								</li>
								<li>
									<div className="listRow">
										<p> Steven Kuang </p>
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
									</div>
								</li>
								<li>
									<div className="listRow">
										<p> Agnieszka Gawrys </p>
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
									</div>
								</li>
								<li>
									<div className="listRow">
										<p>Jason Dong</p>
										<button
											className="buttonRound btn-danger"
											onClick={() => {
												this.setState({ showConfirmDeleteModal: true });
											}}
										>
											-
										</button>
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

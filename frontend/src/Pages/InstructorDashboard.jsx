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
			showLessonModal: false
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
								<ol>
									<li>
										Caramel Latte{' '}
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>1. Get</li>
												<li>2. Drink</li>
												<li>3. Done</li>
											</ol>
										</Collapsible>
									</li>
									<li className="oddDiv">
										Strawberry Green Tea
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>1. Get</li>
												<li>2. Drink</li>
												<li>3. Done</li>
											</ol>
										</Collapsible>
									</li>

									<li>
										Mocha Frappuccino
										<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
											<ol>
												<li>1. Get</li>
												<li>2. Drink</li>
												<li>3. Done</li>
											</ol>
										</Collapsible>
									</li>
								</ol>
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
								>
									{this.getCourseForm()}
								</FormModal>
							</div>
							<div className="recentLessonsBottom">
								<div className="training1">
									<div className="training1Header">
										<h5>Training 1</h5>
										<h6>(3 Drinks)</h6>
									</div>

									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li>Caramel Latte</li>
											<li>Strawberry Green Tea</li>
											<li>Mocha Frappuccino</li>
										</ol>
									</Collapsible>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	getCourseForm() {
		return (
			<div>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Course Name</Form.Label>
						<Form.Control minlength="5" required placeholder="Enter Course Name" />
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control maxlength="140" as="textarea" rows="3" />
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
}

export default InstructorDashboard;

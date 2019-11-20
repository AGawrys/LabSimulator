import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Row, ListGroup } from 'react-bootstrap';
import HeaderBru from '../Components/Header.jsx';
import Collapsible from 'react-collapsible';
import '../Styles/OrganizationDashboard.css';
import Routes from '../utils/RouteConstants.js';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import InstructorRow from '../Components/InstructorRow.jsx';
import LessonRow from '../Components/LessonRow.jsx';
import GeneralConstants from '../utils/GeneralConstants.js';

const links = {
	Account: '/account'
};

export class OrganizationDashboard extends React.Component {

	constructor(props) {
		super(props);
		const organizationInfo =  {
			instructors: [{name: "Kevin McDonnell"}, {name: "Richard McKenna"},{name: "Eugene Stark"}],
			lessons: [{title: "Pumpkin Spice Latte"}, {title: "Caramel Frappuccino"}],
		}
		this.state = {
			showDeleteLesson: false,
			selectedLesson: null,
			showDeleteInstructor: false,
			selectedInstructor: null,
			organizationInfo: organizationInfo,
		}
	}
	

	render() {
		const {showDeleteLesson, selectedLesson, showDeleteInstructor, selectedInstructor, organizationInfo} = this.state;
		if(organizationInfo === null) {
			return null;
		}
		const {instructors, lessons} = organizationInfo;

		return (
			<div className="background">
				<HeaderBru home={Routes.ORGANIZATION_DASHBOARD} isLoggedIn={true} links={links} />
				<ConfirmationModal
					title={GeneralConstants.REMOVE_INSTRUCTOR_TITLE}
					message={GeneralConstants.REMOVE_INSTRUCTOR_MESSAGE}
					onHide={() => this.setState({showDeleteInstructor: false})}
					show={showDeleteInstructor}
					onDelete={this.deleteInstructor}/>
				<ConfirmationModal
					title={GeneralConstants.REMOVE_LESSON_TITLE}
					message={GeneralConstants.REMOVE_LESSON_MESSAGE}
					onHide={() => this.setState({showDeleteLesson: false})}
					show={showDeleteLesson}
					onDelete={this.deleteLesson}/>
				<div className="organizationDashboard">
					<div className="organizationDashboardContents">
						<div className="organizationInstructorDiv">
							<h4>All Instructors</h4>
							<div className="scrollInstructorList">
								<form>
									Add Instructor: <br />
									<input type="text" name="instructor" />
									<input
										className="smallOrganizationButton buttonRound btn-primary"
										type="submit"
										value="+"
									/>
								</form>
								<ListGroup>
									{instructors.map((instructor,index) => 
										<InstructorRow key={index} instructor={instructor} onClick={this.onInstructorClick}/>)
									}
								</ListGroup>
							</div>
						</div>
						<div className="organizationLabDiv">
							<h4>All Lessons</h4>
							<ListGroup>
								{lessons.map((lesson, index) => 
									<LessonRow key={index} lesson={lesson} onClick={this.onLessonClick}/>)
								}
							</ListGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}

	onInstructorClick = (instructor) =>  {
		this.setState({
			showDeleteInstructor: true,
			selectedInstructor: instructor,
		});
	}

	onLessonClick = (lesson) => {
		this.setState({
			showDeleteLesson: true,
			selectedLesson: lesson,
		});
	}
}

export default OrganizationDashboard;

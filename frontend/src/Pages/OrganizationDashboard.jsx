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
import axios from 'axios';

const links = {
	Account: '/account'
};

export class OrganizationDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showDeleteLesson: false,
			selectedLesson: null,
			showDeleteInstructor: false,
			selectedInstructor: null,
			organizationInfo: null,
		}
	}

	componentDidMount() {
		axios.get(Routes.SERVER + "organizationInformation/" + this.props.email).then(
			(response) => this.parseResponse(response.data),
			(error) => console.log(error),
		);
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
								<ListGroup>
									{instructors.map((instructor,index) => 
										<InstructorRow key={index} instructor={instructor} onClick={this.onInstructorClick} disabled/>)
									}
								</ListGroup>
							</div>
						</div>
						<div className="organizationLabDiv">
							<h4>All Lessons</h4>
							<ListGroup>
								{lessons.map((lesson, index) => 
									<LessonRow {...this.props} key={index} lesson={lesson} onClick={this.onLessonClick}/>)
								}
							</ListGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}

	parseResponse = (data) => {
		const organizationInfo = {
			instructors: data.instructors,
			lessons: data.lessons
		};
		this.setState({organizationInfo});
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

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
	Dashboard: Routes.ORGANIZATION_DASHBOARD,
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
		this.fetchInformation();
	}

	fetchInformation() {
		axios.get(Routes.SERVER + "organizationInformation/" + this.props.email).then(
			(response) => this.parseResponse(response.data),
			(error) => console.log(error),
		);
	}
	

	render() {
		const {showDeleteLesson, selectedLesson, showDeleteInstructor, selectedInstructor, organizationInfo} = this.state;
		const {email } = this.props;
		let name = email.split("@");
		name = name[0];
		if(organizationInfo === null) {
			return null;
		}
		const {instructors, lessons} = organizationInfo;

		return (
			<div className="background-container">
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
				<h1 className="m-0 font-weight-light text-secondary headings" style={{ paddingBottom: '25px'}}>Welcome to your Dashboard, {name}</h1>
					
					<div className="organizationDashboardContents">
						<div className="organizationInstructorDiv cardBorder">
						<h5 className="m-0 font-weight-bold text-secondary headings" style={{padding: '15px'}}>ALL INSTRUCTORS</h5>
							<div className="scrollInstructorList">
								<ListGroup>
									{instructors.map((instructor,index) => 
										<InstructorRow key={index} instructor={instructor} onClick={this.onInstructorClick} disabled/>)
									}
								</ListGroup>
							</div>
						</div>
						<div className="organizationLabDiv cardBorder">
						<h5 className="m-0 font-weight-bold text-secondary headings" style={{padding: '15px'}}>ALL LESSONS</h5>
							<ListGroup>
								{lessons.map((lesson, index) => 
									<LessonRow 
										{...this.props} 
										key={index} 
										lesson={lesson} 
										onLessonClick={() => this.props.history.push(Routes.INSTRUCTOR_PREVIEW + lesson.lessonId)}
										canDelete
										onDelete={(e) => this.onLessonDelete(e, lesson)}/>
									)
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
		console.log(organizationInfo);
		this.setState({organizationInfo});
	}

	onInstructorClick = (instructor) =>  {
		this.setState({
			showDeleteInstructor: true,
			selectedInstructor: instructor,
		});
	}

	onLessonDelete = (e,lesson) => {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		this.setState({
			showDeleteLesson: true,
			selectedLesson: lesson,
		});
	}

	deleteLesson = () => {
		const {lessonId} = this.state.selectedLesson;
		axios.post(Routes.SERVER + "deleteLesson/" + lessonId).then(
			(response) => this.fetchInformation(),
			(error) => console.log(error),
		);
	}
}

export default OrganizationDashboard;

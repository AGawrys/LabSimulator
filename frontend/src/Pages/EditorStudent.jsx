import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { Container, Row, Col } from 'react-grid-system';
import Draggable, { DraggableCore } from 'react-draggable';
import { getLessons } from '../Validation/StudentEditorValidation.js';
import { loadLesson } from '../utils/LoadUtils.js';
import 'react-sticky-header/styles.css';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import axios from 'axios';
import Canvas from '../Components/Canvas.jsx';
import InformationModal from '../Components/InformationModal.jsx';
import GeneralConstants from '../utils/GeneralConstants.js';
import { Redirect } from 'react-router-dom';



import { isAbsolute } from 'path';

const green = 'green';
const red = 'red';

const links = {
	Account: '/student/dashboard'
};

class EditorStudent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStepIndex: 0,
			isCurrentStepComplete: false,
			isLessonComplete: false,
			steps: null,
			lesson: null,
			showSuccesfullyComplete: false,
		};
	}

	componentDidMount() {
		const {lesson_id, course_id} = this.props.computedMatch.params;
		const body = {
			courseId: course_id,
			lessonId: lesson_id,
			email: this.props.email,
		};
		
		axios.post(Routes.SERVER + 'canStudentComplete', body).then(
			(response) => this.getLesson(lesson_id, response.data),
			(error) => {
				console.log(error);
				this.props.history.push(Routes.NOT_FOUND);
			}
		);
	}

	getLesson(lesson_id, curriculum) {
		this.setState({curriculum});
		axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
			(response) => {
				const {steps, lesson} = loadLesson(response.data);
				this.setState({steps,lesson});
			},
			(error) => console.log(error),
		);
	}

	lessonStatus = (lessonIndex) => {
		if (lessonIndex == this.state.currentLesson) {
			return [ '#3483eb', 'white' ];
		} else {
			return [ 'white', 'grey' ];
		}
	};

	stepStatus = (lessonIndex, stepIndex) => {
		const { currentStep, currentLesson } = this.state;
		if (lessonIndex <= currentLesson && stepIndex < currentStep) {
			return '#46b056'; // done green
		} else if (lessonIndex == currentLesson && stepIndex == currentStep) {
			return '#3483eb'; // In progress
		} else {
			return 'grey';
		}
	};

	handleStop = (data) => {
		let msg;
		const { x, y, srcElement } = data;
		console.log(srcElement.id);
		console.log('x: ' + x + ' y: ' + y);
		const { lessons, currentLesson, currentStep } = this.state;
		const step = lessons[currentLesson].steps[currentStep];
		if (srcElement.id !== step.source.name) {
			msg = 'That is not a ' + step.source.name + '. (you grabbed a ' + srcElement.id + ' )';
			this.setState({ feedbackMsg: msg });
			this.setState({ feedbackColor: red });
			this.setState({ feedback: true });
		} else if (!(x >= step.goalX.min && x <= step.goalX.max) || !(y >= step.goalY.min && y <= step.goalY.max)) {
			msg = 'Move it a little farther!';
			this.setState({ feedbackMsg: msg });
			this.setState({ feedbackColor: red });
			this.setState({ feedback: true });
		} else {
			msg = 'Very good! Hit next to move on.';
			if (currentStep === lessons[currentLesson].steps.length - 1) {
				msg =
					'You have completed Lesson: ' +
					lessons[currentLesson].name +
					' (Hit next to start the next lesson)';
			}
			this.setState({ disable: null });
			this.setState({ feedbackMsg: msg });
			this.setState({ feedbackColor: green });
			this.setState({ feedback: true });
		}
	};
	//console.log(lessons);
	//console.log("x: " + lessons[currentLesson].steps[currentStep].tools[0].x + " y: " +lessons[currentLesson].steps[currentStep].tools[0].y);
	handleClick() {
		const {steps, currentStepIndex} = this.state;
		if (currentStepIndex == steps.length - 1) {
			this.setLessonComplete()
		}
		else {
			this.setState({
				currentStep: steps[currentStepIndex + 1],
				currentStepIndex: currentStepIndex + 1,
			});
		}
	}

	render() {
		const { lesson, steps, currentStepIndex, curriculum, showSuccesfullyComplete, isLessonComplete} = this.state;
		if (lesson == null) {
			return null;
		}
		const currentStep = steps[currentStepIndex].clone();
		if (isLessonComplete && !showSuccesfullyComplete) {
			return <Redirect exact to ={Routes.STUDENT_DASHBOARD}/>;
		}

		return (
			<div>
				<HeaderBru
					links={links}
					isLoggedIn
					btn="Exit"
					color="#01AFD8"
				/>
				<InformationModal
					title={GeneralConstants.SUCCESSFUL_COMPLETE_LESSON_TITLE}
					message={GeneralConstants.SUCCESSFUL_COMPLETE_LESSON_MESSAGE}
					onHide={() => this.setState({ showSuccesfullyComplete: false })}
					show={showSuccesfullyComplete}
				/>
				<div className="Editor">
					<Row>
						<Col col-sm={3}>
							<div className="divider"> </div>
							<div className="step-column" style={{ overflowY: 'scroll' }}>
									<Card>
										<Card.Header> {lesson.name} </Card.Header>
										<ListGroup >
											{steps.map((step, index) => (
												<ListGroup.Item key={index} active={currentStepIndex == index} as="li">
													{step.name}
												</ListGroup.Item>
											))}
										</ListGroup>
									</Card>
							</div>
						</Col>
						<Col sm={8}>
							<div className="divider" />
							<Canvas isInstructor={false} onDrop={this.onDropTool} tools={currentStep.getTools()} />
							<Button
								style={{float:"left", "margin-right": "10px"}}
								variant="dark"
								onClick={this.handleClick.bind(this)}
								type="button"
							>
								NEXT STEP
							</Button>
							<Button 
								style={{float:"left", "margin-right": "10px"}}
								variant="dark" 
								onClick={this.resetStep}>
								RESET STEP
							</Button>
							<Button
								style={{float:"left"}}
								variant="dark"
								onClick={this.resetLesson}
							>
								RESET LESSON
							</Button>
						</Col>
						<Col>
							<div className="divider" />
						</Col>
					</Row>
				</div>
			</div>
		);
	}

	setLessonComplete = () => {
		const {lesson_id, course_id} = this.props.computedMatch.params;
		const body = {
			email: this.props.email,
			courseId: course_id,
			lessonId: lesson_id,
		};

		axios.post(Routes.SERVER + "markAsComplete", body).then(
			(response) => console.log(response),
			(error) => console.log(error),
		);
		this.setState({
			isLessonComplete: true,
			showSuccesfullyComplete: true,
		});
	}

	resetLesson = () => {
		this.setState({currentStepIndex: 0});
	}

	resetStep = () => {
		this.setState({isCurrentStepComplete: false});
	}

}
export default EditorStudent;

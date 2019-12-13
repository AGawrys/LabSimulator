import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { Container, Row, Col } from 'react-grid-system';
import Draggable, { DraggableCore } from 'react-draggable';
import { getLessons } from '../Validation/StudentEditorValidation.js';
import Lesson from '../Objects/Lesson.js';
import { resizeTools, getCanvasSize } from '../utils/CanvasUtils.js';
import 'react-sticky-header/styles.css';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import axios from 'axios';
import Canvas from '../Components/Canvas.jsx';
import ActionMenuStudent from '../Components/ActionMenuStudent.jsx';
import InformationModal from '../Components/InformationModal.jsx';
import GeneralConstants from '../utils/GeneralConstants.js';
import { Redirect } from 'react-router-dom';
import StirModal from '../Components/StirModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import Pour from '../Components/Pour.jsx';
import StudentDirectionModal from '../Components/StudentDirectionModal.jsx';
import Step from '../Objects/Step.js';


import { isAbsolute } from 'path';

const green = 'green';
const red = 'red';

const links = {
	Dashboard: Routes.STUDENT_DASHBOARD,
};

class EditorStudent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStepIndex: 0,
			isLessonComplete: false,
			steps: null,
			lesson: null,
			showSuccesfullyComplete: false,
			areToolsPlaced: false,
			actionMenu: false,
			source: null,
			target: null,
			actionManagement: null,
			currentAction: 'None',
			showAction: {
				pour: false,
				shake: false,
				blend: false,
				stir: false,
				drag: false
			},
			directionModal: true
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.onCanvasResize);
		this.fetchData();
		this.getCompletedLessons();
	}

	componentDidUpdate() {
		const { areToolsPlaced, steps, canvasSize } = this.state;
		if (!areToolsPlaced && steps != null) {
			resizeTools(canvasSize, steps);
			const { width, height } = getCanvasSize();
			this.setState({
				areToolsPlaced: true,
				steps: steps,
				canvasSize: { width, height }
			});
		}
	}

	getCompletedLessons = () => {
		axios.get(Routes.SERVER + '/completedLesson/' + this.props.email).then(
			(response) => this.setState({directionModal: !response.data}),
			(error) => console.log(error)
		);
	};

	fetchData = () => {
		const { lesson_id, course_id } = this.props.computedMatch.params;
		const body = {
			courseId: course_id,
			lessonId: lesson_id,
			email: this.props.email
		};

		axios.post(Routes.SERVER + 'canStudentComplete', body).then(
			(response) => this.getLesson(lesson_id, response.data),
			(error) => {
				console.log(error);
				this.props.history.push(Routes.NOT_FOUND);
			}
		);
	};

	getLesson(lesson_id, curriculum) {
		axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
			(response) => {
				const { steps, lesson, canvasSize } = Lesson.load(response.data);
				const initialStepStates = steps.map((step) => step.clone());
				this.setState({ curriculum, steps, lesson, canvasSize, initialSteps: initialStepStates });
			},
			(error) => console.log(error)
		);
	}

	handleClick = () => {
		const { steps, currentStepIndex } = this.state;
		if (currentStepIndex == steps.length - 1) {
			this.setLessonComplete();
		} else {
			this.setState({
				currentStep: steps[currentStepIndex + 1],
				currentStepIndex: currentStepIndex + 1,
				source: null,
				target: null,
				actionManagement: null,
				currentAction: 'None',
				showAction: {
					pour: false,
					shake: false,
					blend: false,
					stir: false,
					drag: false
				}
			});
		}
	};

	setSource = (sourceTool, callback) => {
		this.setState({ source: sourceTool },callback);
	};

	setCurrentAction = (action) => {
		const {steps, currentStepIndex, source} = this.state;
		const currentStep = steps[currentStepIndex];
		if (!Step.requiresTarget(action)) {
			if (this.isSelectActionCorrect(action)) {
				this.showActionModal(action.toLowerCase());
			}
			else {
				alert("WRONG SELECT CHOICE");
			}
		}
		else {
			this.setState({currentAction: action});
		}
	}

	onCollisionDetected = (draggedTool, overlappingTools) => {
		if (this.state.source !== draggedTool) {
			return;
		}
		if (!this.isDragActionCorrect(draggedTool,overlappingTools)) {
			alert("WRONG DRAG ACTION");
			return;
		}

		const {steps, currentStepIndex, currentAction} = this.state;
		const currentStep = steps[currentStepIndex];
		const targetIndex = overlappingTools.indexOf(currentStep.target);
		const target = overlappingTools[targetIndex];
		this.setState({target: target});
		this.showActionModal(currentAction.toLowerCase());
	};

	showActionModal = (action) => {
		const {showAction} = this.state;
		showAction[action] = true;
		this.setState(showAction);
	}

	hideActionModal = (action) => {
		const {showAction} = this.state;
		showAction[action] = false;
		this.setState(showAction);
	};
	openActionMenu = () => {
		this.setState({ actionMenu: true });
	};
	render() {
		const { lesson, steps, currentStepIndex, actionManagement, curriculum, showSuccesfullyComplete, isLessonComplete} = this.state;
		const {source,target, showAction, currentAction, directionModal } = this.state;
		const {isPreview} = this.props;
		if (lesson == null) {
			return null;
		}
		const currentStep = steps[currentStepIndex];
		if (isLessonComplete && !showSuccesfullyComplete) {
			return <Redirect exact to={Routes.STUDENT_DASHBOARD} />;
		}

		return (
			<div>
				<HeaderBru {...this.props} home={Routes.STUDENT_DASHBOARD} links={links} isLoggedIn btn="Exit" color="#01AFD8" />
				<InformationModal
					title={GeneralConstants.SUCCESSFUL_COMPLETE_LESSON_TITLE}
					message={GeneralConstants.SUCCESSFUL_COMPLETE_LESSON_MESSAGE}
					onHide={() => this.setState({ showSuccesfullyComplete: false })}
					show={showSuccesfullyComplete}
				/>
				<StudentDirectionModal
					show={directionModal}
					closeDirection={() => {
						this.setState({ directionModal: false });
					}}
				/>
				<ShakeModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.shake}
					timer={currentStep.timer}
					onHide={() => this.hideActionModal("shake")}
					onSuccess={() => {
						this.hideActionModal("shake");
						this.handleClick();
					}}
					timer={currentStep.timer}
					tool={currentStep.source}
				/>
				{showAction.pour ? (
					<Pour
						show={showAction.pour}
						source={currentStep.source}
						target={currentStep.target}
						goal={currentStep.actionMeasurement}
						instructor={false}
						onHide={() => this.hideActionModal("pour")}
						onNextStep={this.handleClick}
					/>
				) : null}
				<StirModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.stir}
					timer={currentStep.timer}
					target={currentStep.target}
					onHide={() => this.hideActionModal("stir")}
					onSuccess={() => {
						this.hideActionModal("stir");
						this.handleClick();
					}}
				/>
				<Container fluid>
					<Row>
						<Col sm={3}>
							<div className="divider"> </div>
							<div className="divider"> </div>
							<div className="divider"> </div>
							<div className="divider"> </div>
							<div className="divider"> </div>
							<div className="step-column" style={{ overflowY: 'scroll' }}>
								<Card>
									<Card.Header> {lesson.name} </Card.Header>
									<ListGroup>
										{steps.map((step, index) => {
											const className = index < currentStepIndex ?  "completed-step" : "";
											return (
												<ListGroup.Item className={className} key={index} active={currentStepIndex == index} as="li">
													{step.name}
												</ListGroup.Item>
											)})}
									</ListGroup>
								</Card>
							</div>
						</Col>
						<Col sm={8}>
							<h3>Step Title: {currentStep.name}</h3>
							<h5>
								Current Action: {currentAction} using {source ? source.name : '____'}{' '}
								{currentAction === 'Shake' ? '' : 'and '}
								{target ? target.name : currentAction === 'Shake' ? '' : '____'}.
							</h5>
							<Canvas
								instructor={false}
								onDrop={this.onCollisionDetected}
								tools={currentStep.getTools()}
								setSource={this.setSource}
								setCurrentAction={this.setCurrentAction}
								setShowAction={this.showActionModal}
								openActionMenu={this.openActionMenu}
							/>
						</Col>
						<Col sm={1}>
							<div className="divider" />
							<div className="divider" />
							<div className="divider" />

							<div className="divider" />
							<div className="divider" />
							<div className="divider" />
							<Button variant="dark" onClick={this.resetStep}>
								RESET STEP
							</Button>
							<div className="divider" />
							<Button variant="dark" onClick={this.restartLesson}>
								RESTART LESSON
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

	setLessonComplete = () => {
		const { lesson_id, course_id } = this.props.computedMatch.params;
		const body = {
			email: this.props.email,
			courseId: course_id,
			lessonId: lesson_id
		};

		axios.post(Routes.SERVER + 'markAsComplete', body).then(
			(response) => this.setState({isLessonComplete: true, showSuccesfullyComplete: true}),
			(error) => console.log(error)
		);
	};

	restartLesson = () => {
		const { lesson_id, course_id } = this.props.computedMatch.params;
		const body = {
			email: this.props.email,
			courseId: course_id,
			lessonId: lesson_id
		};
		axios
			.post(Routes.SERVER + 'deleteAssignment', body)
			.then(
				(response) => {
					const newSteps = this.state.initialSteps.map((step) => step.clone());
					this.setState({ steps: newSteps, currentStepIndex: 0 }
				)}, 
				(error) => console.log(error)
			);
	};

	resetStep = () => {
		const {initialSteps,steps, currentStepIndex} = this.state;
		steps[currentStepIndex] = initialSteps[currentStepIndex].clone();
		this.setState({steps});
	};

	onCanvasResize = () => {
		const { canvasSize, steps } = this.state;
		resizeTools(canvasSize, steps);
		const { width, height } = getCanvasSize();
		this.setState({
			steps: steps,
			canvasSize: { width, height }
		});
	};

	isSelectActionCorrect = (action) => {
		const {steps, currentStepIndex, source} = this.state;
		const currentStep = steps[currentStepIndex];
		return action == currentStep.action && source === currentStep.source
	}

	isDragActionCorrect = (draggedTool,overlappingTools) => {
		const {steps, currentStepIndex, currentAction} = this.state;
		const currentStep = steps[currentStepIndex];
		const targetIndex = overlappingTools.indexOf(currentStep.target);
		return currentAction === currentStep.action && draggedTool === currentStep.source && targetIndex !== -1;
	}	
}
export default EditorStudent;

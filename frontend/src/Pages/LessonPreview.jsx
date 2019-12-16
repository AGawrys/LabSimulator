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
import BlendModal from '../Components/BlendModal.jsx';
import PumpModal from '../Components/PumpModal.jsx';
import GrindModal from '../Components/GrindModal.jsx';
import Pour from '../Components/Pour.jsx';
import Step from '../Objects/Step.js';
import StudentDirectionModal from '../Components/StudentDirectionModal.jsx';

import { isAbsolute } from 'path';

class LessonPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStepIndex: 0,
			steps: null,
			lesson: null,
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
				pump: false,
				grind: false,
				stir: false,
				drag: false
			},
			directionModal: true
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.onCanvasResize);
		this.fetchData();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onCanvasResize);
	}

	componentDidUpdate() {
		const { areToolsPlaced, steps, canvasSize } = this.state;
		if (!areToolsPlaced && steps != null) {
			resizeTools(canvasSize, steps);
			const { width, height } = getCanvasSize();
			const initialStepStates = steps.map((step) => step.clone());
			this.setState({
				areToolsPlaced: true,
				steps: steps,
				canvasSize: { width, height },
				initialSteps: initialStepStates
			});
		}
	}

	fetchData = () => {
		const { lesson_id } = this.props.computedMatch.params;
		axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
			(response) => {
				const { steps, lesson, canvasSize } = Lesson.load(response.data);
				this.setState({ steps, lesson, canvasSize });
			},
			(error) => console.log(error)
		);
	};

	onPrevStep = () => {
		const { currentStepIndex } = this.state;
		this.setState({
			currentStepIndex: currentStepIndex - 1,
			source: null,
			target: null,
			actionManagement: null,
			currentAction: 'None',
			showAction: {
				pour: false,
				shake: false,
				blend: false,
				pump: false,
				grind: false,
				stir: false,
				drag: false
			}
		});
	};

	onNextStep = () => {
		const { currentStepIndex, steps } = this.state;
		const newIndex = currentStepIndex == steps.length - 1 ? currentStepIndex : currentStepIndex + 1;
		this.resetStep();
		this.setState({
			currentStepIndex: newIndex,
			source: null,
			target: null,
			actionManagement: null,
			currentAction: 'None',
			showAction: {
				pour: false,
				shake: false,
				blend: false,
				pump: false,
				grind: false,
				stir: false,
				drag: false
			}
		});
	};

	setSource = (sourceTool, callback) => {
		this.setState({ source: sourceTool }, callback);
	};

	setCurrentAction = (action) => {
		const { steps, currentStepIndex, source } = this.state;
		const currentStep = steps[currentStepIndex];
		if (!Step.requiresTarget(action)) {
			if (this.isSelectActionCorrect(action)) {
				this.showActionModal(action.toLowerCase());
			} else {
				alert('WRONG SELECT CHOICE');
			}
		} else {
			this.setState({ currentAction: action });
		}
	};

	onCollisionDetected = (draggedTool, overlappingTools) => {
		if (this.state.source !== draggedTool) {
			return;
		}
		if (!this.isDragActionCorrect(draggedTool, overlappingTools)) {
			alert('WRONG DRAG ACTION');
			return;
		}

		const { steps, currentStepIndex, currentAction } = this.state;
		const currentStep = steps[currentStepIndex];
		const targetIndex = overlappingTools.indexOf(currentStep.target);
		const target = overlappingTools[targetIndex];
		this.setState({ target: target });
		this.showActionModal(currentAction.toLowerCase());
	};

	showActionModal = (action) => {
		const { showAction } = this.state;
		showAction[action] = true;
		this.setState(showAction);
	};

	hideActionModal = (action) => {
		const { showAction } = this.state;
		showAction[action] = false;
		this.setState(showAction);
	};
	openActionMenu = () => {
		this.setState({ actionMenu: true });
	};

	render() {
		const { lesson, steps, currentStepIndex, actionManagement } = this.state;
		const { source, target, showAction, currentAction } = this.state;
		const { isPreview, history } = this.props;
		if (lesson == null) {
			return null;
		}
		const currentStep = steps[currentStepIndex];
		const correctDashboard = this.props.role === GeneralConstants.ORGANIZATION ? Routes.ORGANIZATION_DASHBOARD : Routes.INSTRUCTOR_DASHBOARD;
		const home = correctDashboard;
		const links = {
			Dashboard: correctDashboard
		};

		return (
			<div>
				<HeaderBru
					{...this.props}
					home={home}
					links={links}
					isLoggedIn
					btn="Exit"
					color="#01AFD8"
				/>
				<ShakeModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.shake}
					timer={currentStep.timer}
					onHide={() => this.hideActionModal('shake')}
					onSuccess={() => {
						this.hideActionModal('shake');
						this.onNextStep();
					}}
					timer={currentStep.timer}
					tool={currentStep.source}
				/>
				{showAction.blend ? (
					<BlendModal
						show={showAction.blend}
						time={currentStep.timer}
						source={currentStep.source}
						target={currentStep.target}
						onComplete={() => {
							showAction.blend = false;
							this.setState({ showAction });
						}}
					/>
				) : null}
				{showAction.pump ? (
					<PumpModal
						show={showAction.pump}
						source={currentStep.source}
						target={currentStep.target}
						pumpsNeeded={currentStep.actionMeasurement}
						onComplete={() => {
							showAction.pump = false;
							this.setState({ showAction});
						}}
					/>
				) : null}
				{showAction.grind ? (
					<GrindModal
						show={showAction.grind}
						source={currentStep.source}
						onHide={() => this.hideActionModal('grind')}
						onSuccess={() => this.hideActionModal('grind')}
					/>
				) : null}
				{showAction.pour ? (
					<Pour
						show={showAction.pour}
						source={currentStep.source.clone()}
						target={currentStep.target.clone()}
						goal={currentStep.actionMeasurement}
						instructor={false}
						onHide={() => this.hideActionModal('pour')}
						onNextStep={this.onNextStep}
					/>
				) : null}
				<StirModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.stir}
					timer={currentStep.timer}
					target={currentStep.target}
					onHide={() => this.hideActionModal('stir')}
					onSuccess={() => {
						this.hideActionModal('stir');
						this.onNextStep();
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
											const className = index < currentStepIndex ? 'completed-step' : '';
											return (
												<ListGroup.Item
													className={className}
													key={index}
													active={currentStepIndex == index}
													as="li"
												>
													{step.name}
												</ListGroup.Item>
											);
										})}
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
							<Button
								disabled={currentStepIndex === 0}
								variant="dark"
								onClick={this.onPrevStep}
								type="button"
							>
								PREVIOUS STEP
							</Button>
							<div className="divider" />
							<Button
								disabled={currentStepIndex === steps.length - 1}
								variant="dark"
								onClick={this.onNextStep}
								type="button"
							>
								NEXT STEP
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

		axios
			.post(Routes.SERVER + 'markAsComplete', body)
			.then(
				(response) => this.setState({ isLessonComplete: true, showSuccesfullyComplete: true }),
				(error) => console.log(error)
			);
	};

	restartLesson = () => {
		const newSteps = this.state.initialSteps.map((step) => step.clone());
		this.setState({ steps: newSteps, currentStepIndex: 0 });
	};

	resetStep = () => {
		const { initialSteps, steps, currentStepIndex } = this.state;
		steps[currentStepIndex] = initialSteps[currentStepIndex].clone();
		this.setState({ steps });
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
		const { steps, currentStepIndex, source } = this.state;
		const currentStep = steps[currentStepIndex];
		return action == currentStep.action && source === currentStep.source;
	};

	isDragActionCorrect = (draggedTool, overlappingTools) => {
		const { steps, currentStepIndex, currentAction } = this.state;
		const currentStep = steps[currentStepIndex];
		const targetIndex = overlappingTools.indexOf(currentStep.target);
		return currentAction === currentStep.action && draggedTool === currentStep.source && targetIndex !== -1;
	};
}
export default LessonPreview;

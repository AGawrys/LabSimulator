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

import { isAbsolute } from 'path';

const green = 'green';
const red = 'red';

const links = {
	Dashboard: Routes.INSTRUCTOR_DASHBOARD,
};

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
			this.setState({
				areToolsPlaced: true,
				steps: steps,
				canvasSize: { width, height }
			});
		}
	}

	fetchData = () => {
		const { lesson_id } = this.props.computedMatch.params;
		axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
			(response) => {
				const { steps, lesson, canvasSize } = Lesson.load(response.data);
				const initialStepStates = steps.map((step) => step.clone());
				this.setState({ steps, lesson, canvasSize, initialSteps: initialStepStates });
			},
			(error) => console.log(error)
		);
	};

	onPrevStep = () => {
		const {currentStepIndex} = this.state;
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
				stir: false,
				drag: false
			}
		});
	}

	onNextStep = () => {
		const {currentStepIndex, steps} = this.state;
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
				stir: false,
				drag: false
			}
		});
	};

	setSource = (sourceTool) => {
		this.setState({ source: sourceTool });
	};

	onCollisionDetected = (draggedTool, overlappingTools) => {
		const {steps, currentStepIndex, source, currentAction, showAction} = this.state;
		const currentStep = steps[currentStepIndex];
		const targetIndex = overlappingTools.indexOf(currentStep.target);
		if ((source !== draggedTool && currentAction === 'None') || targetIndex === -1) {
			return;
		}

		const target = overlappingTools[targetIndex];
		this.setState({source: draggedTool,target: target});
		if (currentAction === 'Pour' || currentAction === 'Stir') {
			this.showActionModal(currentAction.toLowerCase());
		}
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
		const { lesson, steps, currentStepIndex, actionManagement, } = this.state;
		const {source,target, showAction, currentAction} = this.state;
		const {isPreview, history} = this.props;
		if (lesson == null) {
			return null;
		}
		const currentStep = steps[currentStepIndex];

		return (
			<div>
				<HeaderBru {...this.props} home={Routes.INSTRUCTOR_DASHBOARD} links={links} isLoggedIn btn="Exit" color="#01AFD8" />
				<ShakeModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.shake}
					timer={currentStep.timer}
					onHide={() => this.hideActionModal("shake")}
					onSuccess={() => {
						this.hideActionModal("shake");
						this.onNextStep();
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
						onNextStep={this.onNextStep}
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
								changeActBlend={() => this.setState({ currentAction: 'Blend' })}
								changeActPour={() => this.setState({ currentAction: 'Pour' })}
								changeActStir={() => this.setState({ currentAction: 'Stir' })}
								shake={() => {
									showAction.shake = true;
									this.setState({ showAction });
									this.setState({ currentAction: 'Shake' });
								}}
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
								style={{ float: 'left', marginRight: '10px' }}
								variant="dark"
								onClick={this.onPrevStep}
								type="button"
							>
								PREVIOUS STEP
							</Button>
							<div className="divider" />
							<Button
								disabled={currentStepIndex === steps.length -  1}
								style={{ float: 'left', marginRight: '10px' }}
								variant="dark"
								onClick={this.onNextStep}
								type="button"
							>
								NEXT STEP
							</Button>
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
		const newSteps = this.state.initialSteps.map((step) => step.clone());
		this.setState({ steps: newSteps, currentStepIndex: 0 });
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
}
export default LessonPreview;

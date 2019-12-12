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
			isCurrentStepComplete: false,
			isLessonComplete: false,
			steps: null,
			lesson: null,
			showSuccesfullyComplete: false,
			areToolsPlaced: false,
			actionMenu: false,
			source: null,
			target: null,
			actionManagement: null,
			currentAction: 'none',
			showAction: {
				pour: false,
				shake: false,
				blend: false,
				stir: false,
				drag: false
			}
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.onCanvasResize);
		this.fetchData();
	}

	componentDidUpdate() {
		const { areToolsPlaced, steps, canvasSize } = this.state;
		if (!areToolsPlaced) {
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
				this.setState({ curriculum, steps, lesson, canvasSize });
			},
			(error) => console.log(error)
		);
	}
	//console.log(lessons);
	//console.log("x: " + lessons[currentLesson].steps[currentStep].tools[0].x + " y: " +lessons[currentLesson].steps[currentStep].tools[0].y);
	handleClick = () => {
		const { steps, currentStepIndex } = this.state;
		if (currentStepIndex == steps.length - 1) {
			this.setLessonComplete();
		} else {
			this.setState({
				currentStep: steps[currentStepIndex + 1],
				currentStepIndex: currentStepIndex + 1
			});
		}
	};

	onDropTool = (t1, t2) => {
		this.setState({ source: t1 });
		this.setState({ target: t2 });
		const { showAction } = this.state;
		const { currentStepIndex, steps } = this.state;
		const newActionManagement = steps[currentStepIndex].actionMeasurement;
		this.setState({ actionManagement: newActionManagement });
		const { currentAction } = this.state;
		if (currentAction === 'pour') {
			this.setState({ showPourModal: true });
		} else if (currentAction === 'stir') {
			showAction.stir = true;
			this.setState({ showAction });
		}
	};

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
		const {showPourModal,source, target, showAction } = this.state;
		const {isPreview} = this.props;
		if (lesson == null) {
			return null;
		}
		const currentStep = steps[currentStepIndex].clone();
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
				{showPourModal ? (
					<Pour
						show={showPourModal}
						source={source}
						target={target}
						goal={actionManagement}
						instructor={false}
						onHide={() => this.hideActionModal("pour")}
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
							<div className="divider" />
							<Canvas
								instructor={false}
								onDrop={this.onDropTool}
								tools={currentStep.getTools()}
								changeActBlend={() => this.setState({ currentAction: 'blend' })}
								changeActPour={() => this.setState({ currentAction: 'pour' })}
								changeActStir={() => this.setState({ currentAction: 'stir' })}
								shake={() => {
									showAction.shake = true;
									this.setState({ showAction });
								}}
								openActionMenu={this.openActionMenu}
							/>
							{isPreview ? (
								<Button
									style={{ float: 'left', marginRight: '10px' }}
									variant="dark"
									onClick={this.handleClick}
									type="button"
								>
									NEXT STEP
								</Button>
							) : null}
							<Button
								style={{ float: 'left', marginRight: '10px' }}
								variant="dark"
								onClick={this.resetStep}
							>
								RESET STEP
							</Button>
							<Button style={{ float: 'left' }} variant="dark" onClick={this.restartLesson}>
								RESTART LESSON
							</Button>
						</Col>
						<Col sm={1}>
							<div>
								<ActionMenuStudent show={this.state.actionMenu} />
							</div>
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
			.then((response) => console.log(response), (error) => console.log(error));
		this.setState({
			isLessonComplete: true,
			showSuccesfullyComplete: true
		});
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
			.then((response) => this.setState({ isCurrentStepComplete: false, currentStepIndex: 0 }), (error) => console.log(error));
	};

	resetStep = () => {
		this.setState({ isCurrentStepComplete: false });
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
export default EditorStudent;

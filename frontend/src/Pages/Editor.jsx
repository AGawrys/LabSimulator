import React, { Component } from 'react';
import {
	Button,
	Dropdown,
	DropdownButton,
	Card,
	ListGroup,
	Modal,
	Form,
	OverlayTrigger,
	Tooltip,
	FormControl
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import Select from 'react-select';
import HeaderBru from '../Components/Header.jsx';
import Catalog from '../Components/Catalog.jsx';
import Canvas from '../Components/Canvas.jsx';
import Routes from '../utils/RouteConstants.js';
import GeneralConstants from '../utils/GeneralConstants.js';
import {ACTIONS, DEFAULT_TOOL_SIZE, DEFAULT_STEP_NAME} from '../utils/EditorConstants.js';
import { determineToolPosition, determineToolSize, getCanvasSize, resizeTools } from '../utils/CanvasUtils.js';
import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Tool from '../Objects/Tool.js';
import Position from '../Objects/Position.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import InformationModal from '../Components/InformationModal.jsx';
import EditorNotification from '../Components/EditorNotification.jsx';
import StringUtils from '../utils/StringUtils.js';
import { IMAGES, createImage } from '../Components/Tools.jsx';
import { SortableContainer, SortableStep } from '../Components/StepItem.jsx';
import { swapElements } from '../LilacArray.js';
import axios from 'axios';
import plus from '../Styles/Images/icons8-plus.svg';

const links = {
	Account: '/instructor/dashboard'
};

class Editor extends Component {
	constructor(props) {
		super(props);
		const lesson = new Lesson();
		this.state = {
			lesson: lesson,
			currentStep: null,
			steps: null,
			showDeleteLessonModal: false,
			showSuccessfullyPublished: false,
			showSuccessfulDuplicate: false,
			showIncompleteSteps: false,
			showSuccessfulSave:false,
			showSaveBeforePublish: false,
			showActionMenu: true,
			copiedTool: null,
			areToolsPlaced: false,
			canvasSize: {height: 1000, width: 1000},
		};

		this.onDropTool = this.onDropTool.bind(this);
	}

	handleToolClick = () => {
		this.setState({ showActionMenu: !this.showActionMenu });
	};

	handleSimulate() {}

	componentDidMount() {
		window.addEventListener("resize", this.onCanvasResize);
		this.fetchData();
	}

	componentDidUpdate() {
		const {areToolsPlaced, steps, canvasSize} = this.state;
		if (!areToolsPlaced) {
			resizeTools(canvasSize,steps);
			const {width, height} = getCanvasSize();
			this.setState({
				areToolsPlaced: true,
				steps: steps,
				canvasSize: {width, height}, 
			});
		}
	}

	fetchData = () => {
		const lesson_id = this.props.computedMatch.params.lesson_id;
		this.state.lesson.setId(lesson_id);
		axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
			(response) => this.loadLesson(response),
			(error) => {
				console.log(error);
				this.props.history.push(Routes.NOT_FOUND);
			}
		);
	}

	loadLesson = (response) => {
		const {instructorEmail} = response.data.lesson;
		if (instructorEmail !== this.props.email) {
			this.props.history.push(Routes.NOT_FOUND);
		}
		const loadedLesson = Lesson.load(response.data);
		this.setState(loadedLesson);
	}

	handleFieldChange = (e) => {
		this.state.lesson.setName(e.target.value);
	};

	render() {
		const { lesson, currentStep, steps, copiedTool} = this.state;
		const {showSuccessfulDuplicate, showDeleteLessonModal, showSuccessfullyPublished, showSuccessfulSave, showIncompleteSteps, showSaveBeforePublish } = this.state;
		if (steps == null) {
			return null;
		}
		const toolOptions = currentStep.tools.map((tool) => tool.toSelectOption());
		const publishBtn = lesson.isPublished ? null : (
			<Button variant="primary" onClick={this.onPublishLesson}>
				Publish
			</Button>
		);
		return (
			<div>
				<HeaderBru {...this.props} home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<ConfirmationModal
					title={GeneralConstants.DELETE_LESSON_TITLE}
					message={GeneralConstants.DELETE_LESSON_MESSAGE}
					onHide={() => this.setState({ showDeleteLessonModal: false })}
					show={showDeleteLessonModal}
					onDelete={this.deleteLesson}
				/>
				<EditorNotification
					message={GeneralConstants.SUCCESSFUL_PUBLISH_LESSON_MESSAGE}
					onClose={() => this.setState({ showSuccessfullyPublished: false })}
					show={showSuccessfullyPublished}
					isSuccess
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SUCCESSFUL_DUPLICATE_MESSAGE}
					onClose={() => this.setState({showSuccessfulDuplicate: false})}
					show={showSuccessfulDuplicate}
					isSuccess
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SUCCESSFUL_SAVE_MESSAGE}
					onClose={() => this.setState({showSuccessfulSave: false})}
					show={showSuccessfulSave}
					isSuccess
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.CANNOT_PUBLISH_MESSAGE}
					onClose={() => this.setState({showIncompleteSteps: false})}
					show={showIncompleteSteps}
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SAVE_BEFORE_PUBLISH_MESSAGE}
					onClose={() => this.setState({showSaveBeforePublish: false})}
					show={showSaveBeforePublish}
					autohide
					delay={1250}
				/>
				<Container fluid={true} className="instructorContainer">
					<Col className="instructorEditorToolBar brownBorder">
						<Row>
							<Col className="editorToolBarSpacing" lg={4}>
								<FormControl
									onChange={(e) => this.handleFieldChange(e)}
									className="editorControlName"
									autoFocus
									type="text"
									defaultValue={lesson.name}
									required
								/>
							</Col>
						</Row>
						<Row>
							<Col className="editorToolBarButton alignLeft" lg={7}>
								{publishBtn}
								<button type="button" className="btn btn-secondary">
									Simulate
								</button>
								<button type="button" className="btn btn-info" onClick={this.cloneLesson}>
									Duplicate
								</button>
							</Col>
							<Col className="editorToolBarButton alignRight" lg={5}>
								<Button
									type="button"
									variant="danger"
									onClick={() => this.setState({ showDeleteLessonModal: true })}
								>
									<i className="fas fa-trash-alt" />
								</Button>
								<Button type="button" variant="success" onClick={
									() => this.saveLesson(
										() => this.setState({showSuccessfulSave: true})
									)}>
									<i className="fas fa-save" />
								</Button>
							</Col>
						</Row>
					</Col>
					<Row>
						<Col lg={2}>
							<div className="editorLeftScroll brownBorder">
								<Card.Header>
									<h6 className="m-0 font-weight-bold text-primary headings"> TOOLS </h6>{' '}
								</Card.Header>
								<Catalog />
								<Catalog />
							</div>
						</Col>

						<Col lg={8}>
							<div className="brownBorder">
							<Canvas 
								instructor={true} 
								onDrop={this.onDropTool} 
								tools={currentStep.getTools()}
								onUpdateTools={this.updateTools} 
								setCopiedTool={this.setCopiedTool}
								copiedTool={copiedTool} />
							</div>
						</Col>

						<Col lg={2}>
							<div className="brownBorder editorRightScroll">
								<Card className="stepCard">
									<Card.Header>
										<h6 className="m-0 font-weight-bold text-primary headings">ACTION MANAGER</h6>
									</Card.Header>
									<div className="scrollableStep">
										<Select
											className="editorSelect"
											placeholder="Action"
											isSearchable={true}
											name="actions"
											options={ACTIONS}
											onChange={(action) => this.updateCurrentAction(action)}
											value={
												currentStep.action ? (
													{ label: currentStep.action, value: currentStep.action }
												) : (
													''
												)
											}
										/>

										<Select
											className="editorSelect"
											classNamePrefix="editorSelect2"
											placeholder="Source"
											isSearchable={true}
											name="sources"
											options={toolOptions}
											onChange={(tool) => this.updateCurrentSource(tool.value)}
											value={currentStep.source ? currentStep.source.toSelectOption() : ''}
										/>

										<Select
											className="editorSelect"
											classNamePrefix="editorSelect2"
											placeholder="Target"
											isSearchable={true}
											name="targets"
											isDisabled={currentStep.action !== 'Pour'}
											options={toolOptions}
											onChange={(tool) => this.updateCurrentTarget(tool.value)}
											value={currentStep.target ? currentStep.target.toSelectOption() : ''}
										/>
										<input
											className="actionMeasurementControl"
											type="number"
											min="1"
											placeholder="Action Measurement"
											onChange={(e) => this.updateActionMeasurement(e)}
											value={
												currentStep.actionMeasurement ? currentStep.actionMeasurement > 0 ? (
													currentStep.actionMeasurement
												) : (
													''
												) : (
													''
												)
											}
										/>
										<input
											className="actionMeasurementControl"
											type="number"
											min="1"
											placeholder="Timer (Seconds)"
											onChange={(e) => this.updateTimer(e)}
											value={
												currentStep.timer ? currentStep.timer > 0 ? currentStep.timer : '' : ''
											}
										/>
									</div>
								</Card>

								<Card className="stepCard">
									<Card.Header>
										<Row style={{ justifyContent: 'space-evenly' }}>
											<h6 className="m-0 font-weight-bold text-primary headings"> STEPS </h6>
											<button title="Add Step" className="clearButton" onClick={this.addStep}>
												<img src={plus} />
											</button>
										</Row>
									</Card.Header>
									<div className="scrollableStep">
										<SortableContainer onSortEnd={this.onDropStep} useDragHandle>
											{steps.map((step, index) => this.renderStep(step, index))}
										</SortableContainer>
									</div>
								</Card>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

	saveLesson = (callback) => {
		const {lesson, steps} = this.state;
		const savedLesson = lesson.save(steps);
		axios.post(Routes.SERVER + 'updateLessonName', savedLesson).then(
			(response) => callback(),
			(error) => console.log(error),
		);
	};

	renderStep = (step, index) => {
		const { currentStep } = this.state;
		const isActive = step === currentStep;
		return (
			<SortableStep
				key={index}
				index={index}
				stepIndex={index}
				isActive={isActive}
				onStepClick={this.onStepClick}
				onStepNameChange={this.onStepNameChange}
				onCloneStep={this.onCloneStep}
				onDeleteStep={this.onDeleteStep}
				onFieldBlur={this.onFieldBlur}
				value={step}
				isDisabled={this.state.steps.length === 1}
			/>
		);
	};

	onDropTool(data) {
		const {x,y} = determineToolPosition(DEFAULT_TOOL_SIZE);
		const {width, height} = determineToolSize(data.tool,this.state.currentStep.tools);
		const position = new Position(x, y);
		const image = createImage(data.tool);
		const layer = this.state.currentStep.getTools().length;

		const tool = new Tool(data.tool, image, position,width,height,layer);
		let currentStep = this.state.currentStep;
		currentStep.addTool(tool);
		this.setState({
			currentStep: currentStep
		});
	}

	onDropStep = ({ oldIndex, newIndex }) => {
		const { steps } = this.state;
		const swappedSteps = swapElements(steps, oldIndex, newIndex);
		this.setState({ steps: swappedSteps });
	};

	addStep = () => {
		const { steps, currentStep } = this.state;
		const index = steps.indexOf(currentStep);
		const newStep = new Step();
		steps.splice(index + 1, 0, newStep);
		this.setState({ currentStep: newStep, steps });
	};

	onStepClick = (e) => {
		const index = e.target.getAttribute('index');
		const currentStep = this.state.steps[index];
		this.setState({ currentStep });
	};

	onStepNameChange = (e) => {
		const { currentStep } = this.state;
		currentStep.name = e.target.value;
		this.setState({ currentStep });
	};

	onFieldBlur = (e, step) => {
		if (StringUtils.isEmpty(e.target.value)) {
			step.name = DEFAULT_STEP_NAME;
			this.setState({ steps: this.state.steps });
		}
	};

	onDeleteStep = (e, step) => {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		this.deleteStep(step);
	};

	deleteStep = (step) => {
		const { steps } = this.state;
		const index = steps.indexOf(step);
		const newIndex = index === steps.length - 1 ? index - 1 : index;
		steps.splice(index, 1);
		const currentStep = steps[newIndex];
		this.setState({ currentStep });
	};

	onCloneStep = (e, step) => {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		this.cloneStep(step);
	};

	cloneStep = (step) => {
		const clonedStep = step.clone();
		const { steps } = this.state;
		const index = steps.indexOf(step);
		steps.splice(index + 1, 0, clonedStep);
		this.setState({ steps });
	};

	updateCurrentAction = (action) => {
		const { currentStep } = this.state;
		currentStep.action = action.value;
		if (action.value != 'Pour') {
			currentStep.target = null;
		}
		this.setState({ currentStep });
	};

	updateCurrentSource = (tool) => {
		const { currentStep } = this.state;
		currentStep.source = tool;
		currentStep.target = currentStep.source === currentStep.target ? null : currentStep.target;
		this.setState({ currentStep });
	};

	updateCurrentTarget = (tool) => {
		const { currentStep } = this.state;
		currentStep.target = tool;
		currentStep.source = currentStep.source === currentStep.target ? null : currentStep.source;
		this.setState({ currentStep });
	};

	updateActionMeasurement = (e) => {
		const { currentStep } = this.state;
		if (e.target.value > 0) {
			currentStep.actionMeasurement = e.target.value;
			this.setState({ currentStep });
		} else {
			currentStep.actionMeasurement = null;
			this.setState({ currentStep });
		}
	};

	updateTimer = (e) => {
		const { currentStep } = this.state;
		if (e.target.value > 0) {
			currentStep.timer = e.target.value;
			this.setState({ currentStep });
		} else {
			currentStep.timer = null;
			this.setState({ currentStep });
		}
	};

	handleMenuSource = (e, data) => {
		const index = data.target.getAttribute('index');
		const { currentStep } = this.state;
		const tool = currentStep.tools[index];
		this.updateCurrentSource(tool);
	};

	handleMenuTarget = (e, data) => {
		const index = data.target.getAttribute('index');
		const { currentStep } = this.state;
		const tool = currentStep.tools[index];
		this.updateCurrentTarget(tool);
	};

	deleteLesson = () => {
		const { lesson_id } = this.props.computedMatch.params;
		axios.post(Routes.SERVER + 'deleteLesson/' + lesson_id, {}).then(
			(response) => {
				this.props.history.push(Routes.INSTRUCTOR_DASHBOARD);
			},
			(error) => console.log(error)
		);
	};

	onPublishLesson = () => {
		const incompleteSteps = this.state.steps.filter(step => !step.isComplete());
		if (incompleteSteps.length !== 0) {
			this.setState({showIncompleteSteps: true});
		}
		else {
			this.publishLesson();
		}
	}

	publishLesson = () => {
		const { lesson_id } = this.props.computedMatch.params;
		const body = {
			lessonId: lesson_id,
			email: this.props.email
		};
		axios.post(Routes.SERVER + 'publishLesson', body).then(
			(response) => {
				this.state.lesson.isPublished = true;
				this.setState({ showSuccessfullyPublished: true });
			},
			(error) => this.setState({"showSaveBeforePublish": true})
		);
	};

	cloneLesson = () => {
		const { lesson } = this.state;
		const body = {
			lessonId: lesson.id,
			email: this.props.email
		};
		axios.post(Routes.SERVER + 'cloneLesson/', body).then(
			(response) => this.setState({showSuccessfulDuplicate: true}),
			(error) => console.log(error),
		);
	}

	setCopiedTool = (tool) => {
		this.setState({copiedTool: tool});
	}

	updateTools = (tools) => {
		const {currentStep} = this.state;
		if (tools.indexOf(currentStep.source) == -1) {
			currentStep.source = null;
		}
		if (tools.indexOf(currentStep.target) == -1) {
			currentStep.target = null;
		}
		currentStep.tools = tools;
		this.setState({currentStep});
	}

	onCanvasResize = () => {
		const {canvasSize, steps} = this.state;
		resizeTools(canvasSize, steps);
		const {width, height} = getCanvasSize();
		this.setState({
			steps: steps,
			canvasSize: {width,height},
		});
	}
}

export default Editor;

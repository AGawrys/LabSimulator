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
import { ACTIONS, DEFAULT_TOOL_SIZE, DEFAULT_STEP_NAME } from '../utils/EditorConstants.js';
import { determineToolPosition, determineToolSize, getCanvasSize, resizeTools } from '../utils/CanvasUtils.js';
import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Tool from '../Objects/Tool.js';
import { Tool as ToolComponent } from '../Components/Tool.jsx';
import Position from '../Objects/Position.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import StirModal from '../Components/StirModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import InformationModal from '../Components/InformationModal.jsx';
import EditorNotification from '../Components/EditorNotification.jsx';
import StringUtils from '../utils/StringUtils.js';
import { IMAGES, createImage } from '../Components/Tools.jsx';
import { SortableContainer, SortableStep } from '../Components/StepItem.jsx';
import { swapElements } from '../LilacArray.js';
import axios from 'axios';
import plus from '../Styles/Images/icons8-plus.svg';
import { HotKeys } from 'react-hotkeys';
import Pour from '../Components/Pour.jsx';

const links = {
	Dashboard: Routes.INSTRUCTOR_DASHBOARD
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
			showSuccessfulSave: false,
			showPublished: false,
			showSaveBeforePublish: false,
			showActionMenu: true,
			showAction: {
				pour: false,
				shake: false,
				blend: false,
				stir: false,
				drag: false
			},
			showPourModal: false,
			copiedTool: null,
			areToolsPlaced: false,
			canvasSize: { height: 1000, width: 1000 },
			history: { operations: [], pointer: 0 },
			isDirty: false
		};
		this.onDropTool = this.onDropTool.bind(this);
		this.shortcutHandlers = {
			UNDO: this.onShortcutUndo,
			REDO: this.onShortcutRedo
		};
	}

	handleToolClick = () => {
		this.setState({ showActionMenu: !this.showActionMenu });
	};
	handleSimulate = () => {
		const { currentStep } = this.state;
		if (currentStep && currentStep.action === 'Pour') {
			if (currentStep.source && currentStep.target && currentStep.actionMeasurement) {
				console.log('changing show modal');
				this.setState({ showPourModal: true });
			}
		}
	};

	renderPreview = () => {
		const { currentStep } = this.state;
		if (
			currentStep &&
			currentStep.action === 'Pour' &&
			currentStep.source &&
			currentStep.target &&
			currentStep.actionMeasurement
		) {
			const image = currentStep.target.getImage();
			image.draw = IMAGES['TaperedCup'].draw;
			image.properties = {};
			const amt = currentStep.actionMeasurement / 100;
			image.properties.Fill = currentStep.target.image.properties.Fill + amt;

			const mytool = <ToolComponent tool={new Tool('TaperedCup', image, undefined, 75, 75, undefined)} />;
			return mytool;
		}
	};

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
			this.addOperation();
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onCanvasResize);
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
	};

	loadLesson = (response) => {
		const { instructorEmail } = response.data.lesson;
		const lesson_id = this.props.computedMatch.params.lesson_id;
		if (instructorEmail !== this.props.email) {
			this.props.history.push(Routes.INSTRUCTOR_PREVIEW + lesson_id);
		}
		const loadedLesson = Lesson.load(response.data);
		this.setState(loadedLesson);
		this.setState({ showPublished: this.state.lesson.isPublished });
	};

	handleFieldChange = (e) => {
		this.state.lesson.setName(e.target.value);
	};

	closePourModal = () => {
		const { showAction } = this.state;
		const newShowAction = showAction;
		newShowAction.pour = false;
		this.setState({ showAction: newShowAction });
	};

	render() {
		const { lesson, currentStep, steps, copiedTool, isDirty } = this.state;
		const {
			showSuccessfulDuplicate,
			showDeleteLessonModal,
			showSuccessfullyPublished,
			showSuccessfulSave,
			showIncompleteSteps,
			showSaveBeforePublish,
			showPublished,
			showAction
		} = this.state;
		const { operations, pointer } = this.state.history;
		if (steps == null) {
			return null;
		}
		const toolOptions = currentStep.tools.map((tool) => tool.toSelectOption());
		const pourSourceOptions = toolOptions.filter(
			(tool) =>
				tool.value.type === 'StraightCup' ||
				tool.value.type === 'Shaker' ||
				tool.value.type === 'Blender' ||
				tool.value.type === 'Milk' ||
				tool.value.type === 'PumpBottle'
		);
		const pourTargetOptions = toolOptions.filter(
			(tool) => tool.value.type === 'StraightCup' || tool.value.type === 'Shaker' || tool.value.type === 'Blender'
		);
		const shakeOptions = toolOptions.filter((tool) => tool.value.type === 'Shaker');
		const blendSourceOptions = toolOptions.filter(
			(tool) =>
				tool.value.type === 'Banana' ||
				tool.value.type === 'Mango' ||
				tool.value.type === 'Blueberry' ||
				tool.value.type === 'Strawberry'
		);
		const blendTargetOptions = toolOptions.filter((tool) => tool.value.type === 'Blender');
		const stirSourceOptions = toolOptions.filter((tool) => tool.value.type === 'Spoon');
		const stirTargetOptions = toolOptions.filter(
			(tool) => tool.value.type === 'StraightCup' || tool.value.type === 'Blender'
		);
		const dragSourceOptions = toolOptions.filter(
			(tool) => tool.value.type === 'CupLid' || tool.value.type === 'CupSleeve' || tool.value.type === 'IceCube'
		);
		const dragTargetOptions1 = toolOptions.filter(
			(tool) => tool.value.type === 'StraightCup' || tool.value.type === 'Blender' || tool.value.type === 'Shaker'
		);
		const dragTargetOptions2 = toolOptions.filter((tool) => tool.value.type === 'StraightCup');

		const publishBtn = lesson.isPublished ? null : (
			<Button variant="primary" onClick={this.onPublishLesson}>
				Publish
			</Button>
		);
		return (
			<HotKeys handlers={this.shortcutHandlers}>
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
					onClose={() => this.setState({ showSuccessfulDuplicate: false })}
					show={showSuccessfulDuplicate}
					isSuccess
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SUCCESSFUL_SAVE_MESSAGE}
					onClose={() => this.setState({ showSuccessfulSave: false })}
					show={showSuccessfulSave}
					isSuccess
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.CANNOT_PUBLISH_MESSAGE}
					onClose={() => this.setState({ showIncompleteSteps: false })}
					show={showIncompleteSteps}
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SAVE_BEFORE_PUBLISH_MESSAGE}
					onClose={() => this.setState({ showSaveBeforePublish: false })}
					show={showSaveBeforePublish}
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SHOW_PUBLISHED}
					onClose={() => this.setState({ showPublished: false })}
					show={showPublished}
					autohide
					delay={1550}
				/>
				<ShakeModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.shake}
					onHide={() => this.hideActionModal('shake')}
					onSuccess={() => this.hideActionModal('shake')}
					timer={currentStep.timer}
					tool={currentStep.source}
				/>
				<StirModal
					progressNeeded={currentStep.actionMeasurement}
					show={showAction.stir}
					timer={currentStep.timer}
					target={currentStep.target}
					onHide={() => this.hideActionModal('stir')}
					onSuccess={() => this.hideActionModal('stir')}
				/>
				{showAction.pour ? (
					<Pour
						show={showAction.pour}
						source={currentStep.source.clone()}
						target={currentStep.target.clone()}
						goal={currentStep.actionMeasurement}
						instructor={true}
						onHide={() => this.hideActionModal('pour')}
					/>
				) : null}
				<Container fluid={true} className="instructorContainer">
					<Col className="instructorEditorToolBar brownBorder">
						<Row>
							<Col className="editorToolBarSpacing" lg={4}>
								<FormControl
									onChange={(e) => this.handleFieldChange(e)}
									className="editorControlName"
									autoFocus
									type="text"
									disabled={lesson.isPublished}
									defaultValue={lesson.name}
									required
								/>
							</Col>
						</Row>
						<Row>
							<Col className="editorToolBarButton alignLeft" lg={7}>
								{publishBtn}
								<button
									disabled={!currentStep.isComplete()}
									type="submit"
									className="btn btn-secondary"
									onClick={this.showActionModal}
								>
									Simulate
								</button>
								<button type="button" className="btn btn-info" onClick={this.cloneLesson}>
									Duplicate
								</button>
							</Col>
							<Col className="editorToolBarButton alignRight" lg={5}>
								<Button disabled={pointer === 0} variant="dark" onClick={this.handleUndo}>
									<i className="fa fa-undo" aria-hidden="true" />
								</Button>
								<Button
									disabled={operations.length === 0 || pointer === operations.length - 1}
									variant="dark"
									onClick={this.handleRedo}
								>
									<i className="fa fa-repeat" aria-hidden="true" />
								</Button>
								<Button
									disabled={!isDirty}
									type="button"
									variant="success"
									onClick={() =>
										this.saveLesson(() =>
											this.setState({ showSuccessfulSave: true, isDirty: false })
										)}
								>
									<i className="fas fa-save" />
								</Button>
								<Button
									type="button"
									variant="danger"
									onClick={() => this.setState({ showDeleteLessonModal: true })}
								>
									<i className="fas fa-trash-alt" />
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
								<Catalog published={lesson.isPublished} />
							</div>
						</Col>

						<Col lg={8}>
							<div className="brownBorder">
								<Canvas
									instructor={true}
									onDrop={this.onDropTool}
									tools={currentStep.getTools()}
									onUpdateTools={this.updateTools}
									onUpdateNameTool={this.updateNameTool}
									setCopiedTool={this.setCopiedTool}
									copiedTool={copiedTool}
								/>
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
											isDisabled={lesson.isPublished}
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
											isDisabled={currentStep.action === null || lesson.isPublished}
											name="sources"
											options={
												currentStep.action === 'Shake' ? (
													shakeOptions
												) : currentStep.action === 'Pour' ? (
													pourSourceOptions
												) : currentStep.action === 'Stir' ? (
													stirSourceOptions
												) : currentStep.action === 'Blend' ? (
													blendSourceOptions
												) : currentStep.action === 'Drag' ? (
													dragSourceOptions
												) : (
													''
												)
											}
											onChange={(tool) => this.updateCurrentSource(tool.value)}
											value={currentStep.source ? currentStep.source.toSelectOption() : ''}
										/>

										<Select
											className="editorSelect"
											classNamePrefix="editorSelect2"
											placeholder="Target"
											isSearchable={true}
											name="targets"
											isDisabled={
												lesson.isPublished ||
												currentStep.action === 'Shake' ||
												currentStep.action === null ||
												(currentStep.action === 'Drag' && currentStep.source === null)
											}
											options={
												currentStep.action === 'Pour' ? (
													pourTargetOptions
												) : currentStep.action === 'Stir' ? (
													stirTargetOptions
												) : currentStep.action === 'Blend' ? (
													blendTargetOptions
												) : currentStep.action === 'Drag' ? currentStep.source === null ? (
													''
												) : currentStep.source.type === 'IceCube' ? (
													dragTargetOptions1
												) : (
													dragTargetOptions2
												) : (
													''
												)
											}
											onChange={(tool) => this.updateCurrentTarget(tool.value)}
											value={currentStep.target ? currentStep.target.toSelectOption() : ''}
										/>
										<input
											className="actionMeasurementControl"
											type="number"
											min="1"
											disabled={lesson.isPublished}
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
											max="59"
											placeholder="Timer (Seconds)"
											disabled={currentStep.action === 'Pour' || lesson.isPublished}
											onChange={(e) => this.updateTimer(e)}
											value={currentStep.timer && currentStep.timer > 0 ? currentStep.timer : ''}
										/>
										{/* {this.renderPreview()} */}
									</div>
								</Card>

								<Card className="stepCard">
									<Card.Header>
										<Row style={{ justifyContent: 'space-evenly' }}>
											<h6 className="m-0 font-weight-bold text-primary headings"> STEPS </h6>
											<button
												disabled={lesson.isPublished}
												title="Add Step"
												className="clearButton"
												onClick={this.addStep}
											>
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
			</HotKeys>
		);
	}

	saveLesson = (callback) => {
		const { lesson, steps } = this.state;
		const savedLesson = lesson.save(steps);
		axios
			.post(Routes.SERVER + 'updateLessonName', savedLesson)
			.then((response) => callback(), (error) => console.log(error));
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
		const { width, height } = determineToolSize(data.tool, this.state.currentStep.tools);
		const image = createImage(data.tool);
		const { x, y } = determineToolPosition(width, height);
		const position = new Position(x, y);
		const layer = this.state.currentStep.getTools().length;
		const tool = new Tool(data.tool, image, position, width, height, layer);
		let currentStep = this.state.currentStep;
		currentStep.addTool(tool);
		this.setState(
			{
				currentStep: currentStep
			},
			this.addOperation
		);
	}

	onDropStep = ({ oldIndex, newIndex }) => {
		if (this.state.lesson.isPublished) {
			return;
		}
		const { steps } = this.state;
		const swappedSteps = swapElements(steps, oldIndex, newIndex);
		this.setState({ steps: swappedSteps }, this.addOperation);
	};

	addStep = () => {
		const { steps, currentStep } = this.state;
		const index = steps.indexOf(currentStep);
		const newStep = new Step();
		steps.splice(index + 1, 0, newStep);
		this.setState(
			{
				currentStep: newStep,
				steps: steps
			},
			this.addOperation
		);
	};

	onStepClick = (e) => {
		const index = e.target.getAttribute('index');
		const currentStep = this.state.steps[index];
		this.setState({ currentStep });
	};

	onStepNameChange = (e) => {
		if (this.state.lesson.isPublished) {
			return;
		}
		const { steps, currentStep, history } = this.state;
		currentStep.name = e.target.value;
		this.setState({ currentStep });
	};

	onFieldBlur = (e, step) => {
		if (StringUtils.isEmpty(e.target.value)) {
			step.name = DEFAULT_STEP_NAME;
			this.setState({ steps: this.state.steps }, this.addOperation);
		} else {
			this.addOperation();
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
		if (this.state.lesson.isPublished) {
			return;
		}
		const { steps } = this.state;
		const index = steps.indexOf(step);
		console.log(step);
		const newIndex = index === steps.length - 1 ? index - 1 : index;
		steps.splice(index, 1);
		const currentStep = steps[newIndex];
		this.setState({ currentStep }, this.addOperation);
	};

	onCloneStep = (e, step) => {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		this.cloneStep(step);
	};

	cloneStep = (step) => {
		if (this.state.lesson.isPublished) {
			return;
		}
		const clonedStep = step.clone();
		const { steps } = this.state;
		const index = steps.indexOf(step);
		steps.splice(index + 1, 0, clonedStep);
		this.setState({ steps }, this.addOperation);
	};

	updateCurrentAction = (action) => {
		const { currentStep } = this.state;
		currentStep.action = action.value;
		currentStep.source = null;
		currentStep.target = null;
		currentStep.actionMeasurement = null;
		currentStep.timer = null;
		this.setState({ currentStep }, this.addOperation);
	};

	updateCurrentSource = (tool) => {
		const { currentStep } = this.state;
		currentStep.source = tool;
		currentStep.target = currentStep.source === currentStep.target ? null : currentStep.target;
		this.setState({ currentStep }, this.addOperation);
	};

	updateCurrentTarget = (tool) => {
		const { currentStep } = this.state;
		currentStep.target = tool;
		currentStep.source = currentStep.source === currentStep.target ? null : currentStep.source;
		this.setState({ currentStep }, this.addOperation);
	};

	updateActionMeasurement = (e) => {
		const { currentStep } = this.state;
		if (e.target.value > 0) {
			currentStep.actionMeasurement = e.target.value;
			this.setState({ currentStep });
		} else {
			currentStep.actionMeasurement = null;
			this.setState({ currentStep }, this.addOperation);
		}
	};

	updateTimer = (e) => {
		const { currentStep } = this.state;
		if (e.target.value > 0 && e.target.value < 60) {
			currentStep.timer = e.target.value;
			this.setState({ currentStep }, this.addOperation);
		} else {
			currentStep.timer = null;
			this.setState({ currentStep }, this.addOperation);
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
		const incompleteSteps = this.state.steps.filter((step) => !step.isComplete());
		if (incompleteSteps.length !== 0) {
			this.setState({ showIncompleteSteps: true });
		} else {
			this.publishLesson();
		}
	};

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
			(error) => this.setState({ showSaveBeforePublish: true })
		);
	};

	cloneLesson = () => {
		const { lesson } = this.state;
		const body = {
			lessonId: lesson.id,
			email: this.props.email
		};
		axios
			.post(Routes.SERVER + 'cloneLesson/', body)
			.then((response) => this.setState({ showSuccessfulDuplicate: true }), (error) => console.log(error));
	};

	setCopiedTool = (tool) => {
		this.setState({ copiedTool: tool });
	};

	updateTools = (tools) => {
		const { currentStep } = this.state;
		if (tools.indexOf(currentStep.source) == -1) {
			currentStep.source = null;
		}
		if (tools.indexOf(currentStep.target) == -1) {
			currentStep.target = null;
		}

		currentStep.tools = tools;
		this.setState({ currentStep }, this.addOperation);
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

	addOperation = () => {
		const { operations, pointer } = this.state.history;
		operations.splice(pointer + 1); // remove all operations after the current one
		const stepState = this.cloneState(this.state);
		operations.push(stepState);
		this.setState({
			history: { operations: operations, pointer: operations.length - 1 },
			isDirty: operations.length > 1
		});
	};

	handleUndo = () => {
		const { operations, pointer } = this.state.history;
		const currentState = operations[pointer - 1];
		this.state.history.pointer -= 1;
		const clonedState = this.cloneState(currentState);
		clonedState.isDirty = true;
		this.setState(clonedState);
	};

	handleRedo = () => {
		const { operations, pointer } = this.state.history;
		const currentState = operations[pointer + 1];
		this.state.history.pointer += 1;
		const clonedState = this.cloneState(currentState);
		clonedState.isDirty = true;
		this.setState(clonedState);
	};

	cloneState = (state) => {
		const { steps, currentStep } = state;
		const currentStepIndex = steps.indexOf(currentStep);
		const clonedSteps = steps.map((step) => step.clone());
		return { steps: clonedSteps, currentStep: clonedSteps[currentStepIndex] };
	};

	onShortcutUndo = () => {
		const { operations, pointer } = this.state.history;
		if (pointer === 0) {
			return;
		}
		this.handleUndo();
	};

	onShortcutRedo = () => {
		const { operations, pointer } = this.state.history;
		if (operations.length === 0 || pointer === operations.length - 1) {
			return;
		}
		this.handleRedo();
	};

	hideActionModal = (action) => {
		const { showAction } = this.state;
		showAction[action] = false;
		this.setState(showAction);
	};

	showActionModal = (e) => {
		e.preventDefault();
		const { showAction, currentStep } = this.state;
		showAction[currentStep.action.toLowerCase()] = true;
		this.setState({ showAction });
	};
}

export default Editor;

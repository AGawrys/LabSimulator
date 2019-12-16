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
import { ACTIONS, DEFAULT_TOOL_SIZE, DEFAULT_STEP_NAME, DEFAULT_LESSON_NAME } from '../utils/EditorConstants.js';
import { determineToolPosition, determineToolSize, getCanvasSize, resizeTools, getColorMedian } from '../utils/CanvasUtils.js';
import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Tool from '../Objects/Tool.js';
import { Tool as ToolComponent } from '../Components/Tool.jsx';
import Position from '../Objects/Position.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import StirModal from '../Components/StirModal.jsx';
import BlendModal from '../Components/BlendModal.jsx';
import PumpModal from '../Components/PumpModal.jsx';
import BrewModal from '../Components/BrewModal.jsx';
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
import { Prompt} from 'react-router-dom';

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
			showPublishConfirmation: false,
			showPublished: false,
			showSaveBeforePublish: false,
			showActionMenu: true,
			showPourError: false,
			showStirError: false,
			showShakeError: false,
			showBlendError: false,
			showAction: {
				pour: false,
				shake: false,
				blend: false,
				pump: false,
				stir: false,
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
			this.props.history.replace(Routes.INSTRUCTOR_PREVIEW + lesson_id);
		}
		const loadedLesson = Lesson.load(response.data);
		this.setState(loadedLesson);
		this.setState({ showPublished: this.state.lesson.isPublished });
	};

	handleFieldChange = (e) => {
		this.state.lesson.name = e.target.value;
		this.setState({ lesson: this.state.lesson });
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
			showPublishConfirmation,
			showAction,
			showPourError,
			showStirError,
			showShakeError,
			showBlendError
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
				tool.value.type === 'Kettle' ||
				tool.value.type === 'CoffeePot'
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
				tool.value.type === 'Strawberry' ||
				tool.value.type === 'IceCube'
		);
		const blendTargetOptions = toolOptions.filter((tool) => tool.value.type === 'Blender');
		const pumpSourceOptions = toolOptions.filter((tool) => tool.value.type === "PumpBottle");
		const pumpTargetOptions = toolOptions.filter(
			(tool) => tool.value.type === "StraightCup" || tool.value.type === "Shaker" || tool.value.type === "Blender"
		)
		const stirSourceOptions = toolOptions.filter((tool) => tool.value.type === 'Spoon' || tool.value.type === 'TeaBag');
		const stirTargetOptions = toolOptions.filter((tool) => tool.value.type === 'StraightCup' || tool.value.type === 'Blender');
		const brewSourceOptions = toolOptions.filter((tool) => tool.value.type === 'CoffeeGround');
		const brewTargetOptions = toolOptions.filter((tool) => tool.value.type === 'CoffeeMachine');

		const publishBtn = lesson.isPublished ? null : (
			<Button variant="primary" onClick={() => this.setState({ showPublishConfirmation: true })}>
				Publish
			</Button>
		);
		return (
			<HotKeys handlers={this.shortcutHandlers}>
				<Prompt
				  when={isDirty}
				  message={GeneralConstants.UNSAVED_EDITOR_MESSAGE}
				/>
				<HeaderBru {...this.props} home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<ConfirmationModal
					title={GeneralConstants.DELETE_LESSON_TITLE}
					message={GeneralConstants.DELETE_LESSON_MESSAGE}
					onHide={() => this.setState({ showDeleteLessonModal: false })}
					show={showDeleteLessonModal}
					onDelete={this.deleteLesson}
				/>
				<ConfirmationModal
					title={GeneralConstants.PUBLISH_CONFIRMATION_TITLE}
					message={GeneralConstants.PUBLISH_CONFIRMATION_MESSAGE}
					onHide={() => this.setState({ showPublishConfirmation: false })}
					show={showPublishConfirmation}
					onDelete={this.onPublishLesson}
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
					message={GeneralConstants.POUR_NO_FILL_MESSAGE}
					onClose={() => this.setState({ showPourError: false })}
					show={showPourError}
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.STIR_NO_FILL_MESSAGE}
					onClose={() => this.setState({ showStirError: false })}
					show={showStirError}
					autohide
					delay={1250}
				/>
				<EditorNotification
					message={GeneralConstants.SHAKE_NO_FILL_MESSAGE}
					onClose={() => this.setState({ showShakeError: false })}
					show={showShakeError}
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
				/>
				<EditorNotification
					message={GeneralConstants.BLEND_OVER_FILL_MESSAGE}
					onClose={() => this.setState({ showBlendError: false })}
					show={showBlendError}
					autohide
					delay={1250}
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
					source={currentStep.source}
					target={currentStep.target}
					onHide={() => this.hideActionModal('stir')}
					onSuccess={() => this.hideActionModal('stir')}
				/>
				{showAction.brew ? (
					<BrewModal
						show={showAction.brew}
						timer={currentStep.timer}
						source={currentStep.source}
						onHide={() => this.hideActionModal('stir')}
						onSuccess={() => this.hideActionModal('stir')}
					/>
				) : null}
				{showAction.blend ? (
					<BlendModal
						show={showAction.blend}
						time={currentStep.timer}
						source={currentStep.source}
						target={currentStep.target}
						onHide={() => this.hideActionModal('blend')}
						onComplete={() => this.hideActionModal('blend')}
					/>
				) : null}
				{showAction.pump ? (
					<PumpModal
						show={showAction.pump}
						source={currentStep.source}
						target={currentStep.target}
						pumpsNeeded={currentStep.actionMeasurement}
						onHide={() => this.hideActionModal('pump')}
						onComplete={() => this.hideActionModal('pump')}
					/>
				) : null}
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
									type="text"
									disabled={lesson.isPublished}
									value={lesson.name}
									required
									onBlur={this.onLessonFieldBlur}
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
								<Button
									disabled={pointer === 0 || lesson.isPublished}
									variant="dark"
									onClick={this.handleUndo}
								>
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
									disabled={!isDirty || lesson.isPublished}
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
									disabled={lesson.isPublished}
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
												) : currentStep.action === 'Pump' ? (
													pumpSourceOptions	
												) : currentStep.action === 'Brew' ? (
													brewSourceOptions
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
												currentStep.action === null
											}
											options={
												currentStep.action === 'Pour' ? (
													pourTargetOptions
												) : currentStep.action === 'Stir' ? (
													stirTargetOptions
												) : currentStep.action === 'Blend' ? (
													blendTargetOptions
												) : currentStep.action === 'Pump' ? (
													pumpTargetOptions
												) : currentStep.action === 'Brew' ? (
													brewTargetOptions
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
											hidden={
												currentStep.action === "Blend" ||
												currentStep.action === "Brew"
											}
										/>
										<input
											className="actionMeasurementControl"
											type="number"
											min="1"
											max="59"
											placeholder="Timer (Seconds)"
											hidden={
												currentStep.action === 'Pour' ||
												currentStep.action === 'Pump'
											}
											disabled={lesson.isPublished}
											onChange={(e) => this.updateTimer(e)}
											value={currentStep.timer && currentStep.timer > 0 ? currentStep.timer : ''}
										/>
										{currentStep.isComplete() ? (
											<ToolComponent tool={this.renderPreview()} />
										) : null}
										<button
											show={!currentStep.isComplete()}
											disabled={!currentStep.isComplete()}
											type="button"
											className="btn btn-secondary"
											onClick={this.setPreviewToCopiedTool}
										>
											COPY
										</button>
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
				isDisabled={this.state.lesson.isPublished}
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

	onLessonFieldBlur = (e) => {
		if (StringUtils.isEmpty(e.target.value)) {
			this.state.lesson.name = DEFAULT_LESSON_NAME;
			this.setState({ lesson: this.state.lesson }, this.addOperation);
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
		if (this.state.lesson.isPublished || this.state.steps.length === 1) {
			return;
		}
		const { steps } = this.state;
		const index = steps.indexOf(step);
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
			currentStep.actionMeasurement = Number(e.target.value);
		} else {
			currentStep.actionMeasurement = null;
		}
		this.setState({ currentStep }, this.addOperation);
	};

	updateTimer = (e) => {
		const { currentStep } = this.state;
		if (e.target.value > 0 && e.target.value < 60) {
			currentStep.timer = Number(e.target.value);
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
		const { currentStep, isDirty } = this.state;
		if (currentStep.action === 'Pour' && currentStep.source.amount === 0) {
			this.setState({ showPourError: true });
			return;
		}
		if (currentStep.action === 'Stir' && currentStep.target.amount === 0) {
			this.setState({ showStirError: true });
			return;
		}
		if (currentStep.action === 'Shake' && currentStep.source.amount === 0) {
			this.setState({ showShakeError: true });
			return;
		}
		if (incompleteSteps.length !== 0) {
			this.setState({ showIncompleteSteps: true });
			return;
		}
		if (isDirty) {
			this.setState({ showSaveBeforePublish: true});
			return;
		}
		else {
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
		const { steps, currentStep, lesson } = state;
		const currentStepIndex = steps.indexOf(currentStep);
		const clonedSteps = steps.map((step) => step.clone());
		const clonedLesson = lesson.clone();
		return { steps: clonedSteps, currentStep: clonedSteps[currentStepIndex], lesson: clonedLesson };
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
		if (currentStep.action === 'Pour' && (currentStep.source.amount === 0 && !currentStep.source.image.animation.Fill)) {
			this.setState({ showPourError: true });
			return;
		}
		if (currentStep.action === 'Stir' && currentStep.target.amount === 0) {
			this.setState({ showStirError: true });
			return;
		}
		if (currentStep.action === 'Shake' && currentStep.source.amount === 0) {
			this.setState({ showShakeError: true });
			return;
		}
		if (currentStep.action === 'Blend' && currentStep.target.amount >= 0.75) {
			this.setState({ showBlendError: true });
			return;
		}
		showAction[currentStep.action.toLowerCase()] = true;
		this.setState({ showAction });
	};

	renderPreview = () => {
		const { currentStep } = this.state;
		if (currentStep && currentStep.isComplete()) {
			let tool;
			let t = currentStep;
			if (Step.requiresTarget(currentStep.action)) {
				t = currentStep.target.clone();
			} else {
				t = currentStep.source.clone();
			}
			const image = t.getImage();
			image.draw = IMAGES[t.type].draw;
			if (
				currentStep.action === 'Pour' &&
				currentStep.source &&
				currentStep.target &&
				currentStep.actionMeasurement
			) {
				let sourceColor = currentStep.source.getImage().properties.Color;
				const statics = [ 'Milk', 'Kettle', 'CoffeePot' ];
				if (statics.indexOf(currentStep.source.type) !== -1) {
					sourceColor = currentStep.source.getImage().animation.Color;
				}
				if (image.properties.Fill === 0.0) {
					image.properties.Color = sourceColor;
				} else {
					image.properties.Color = getColorMedian(sourceColor, image.properties.Color);
				}
				const amt = currentStep.actionMeasurement / 100;
				image.properties.Fill = image.properties.Fill + amt;
			} else if (currentStep.action === 'Blend' || currentStep.action === 'Pump') {
				const sourceColor =
					currentStep.action === 'Blend'
						? currentStep.source.getImage().animation.Color
						: currentStep.source.getImage().properties.Color;
				if (image.properties.Fill === 0.0) {
					image.properties.Color = sourceColor;
				} else {
					image.properties.Color = getColorMedian(sourceColor, image.properties.Color);
				}
				if (currentStep.action === 'Blend') {
					image.properties.Fill = image.properties.Fill + 0.25;
				} else {
					image.properties.Fill = image.properties.Fill + 0.05 * currentStep.actionMeasurement;
				}
			} else if (currentStep.action === 'Stir' || currentStep.action === 'Shake') {
			} else if (currentStep.action === 'Grind') {
				const image = IMAGES['CoffeeGround'];
				return new Tool('CoffeeGround', image, t.position, 75, 75, undefined);
			} else if (currentStep.action === 'Brew') {
				const image = IMAGES['CoffeePot'];
				return new Tool('CoffeePot', image, t.position, 75, 75, undefined);
			}
			tool = t.clone();
			tool.image = image;
			tool.amount = image.properties.Fill;
			tool.color = image.properties.Color;
			return tool;
		}
	};
	setPreviewToCopiedTool = () => {
		const tool = this.renderPreview();
		this.setCopiedTool(tool);
	};
}

export default Editor;
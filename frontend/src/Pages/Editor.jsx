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
import { loadLesson } from '../utils/LoadUtils.js';
import { determineToolPosition, toScaledPosition,placeTools } from '../utils/CanvasUtils.js';
import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Tool from '../Objects/Tool.js';
import Position from '../Objects/Position.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import InformationModal from '../Components/InformationModal.jsx';
import StringUtils from '../utils/StringUtils.js';
import { IMAGES, createImage } from '../Components/Tools.jsx';
import { SortableContainer, SortableStep} from '../Components/StepItem.jsx';
import { swapElements } from '../LilacArray.js';
import axios from 'axios';
import plus from '../Styles/Images/icons8-plus.svg';

//UNDO REDO PUBLISH DELETE SIMULATE

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
			showActionMenu: true,
			copiedTool: null,
			areToolsPlaced: false,
		};

		this.onDropTool = this.onDropTool.bind(this);
	}

	handleToolClick = () => {
		this.setState({ showActionMenu: !this.showActionMenu });
	};
	handleNext() {}
	handleSimulate() {}

	componentDidMount() {
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

	componentDidUpdate() {
		if (!this.state.areToolsPlaced) {
			placeTools(this.state.steps);
			this.setState({areToolsPlaced: true});
		}
	}

	loadLesson = (response) => {
		const {instructorEmail} = response.data.lesson;
		if (instructorEmail !== this.props.email) {
			this.props.history.push(Routes.NOT_FOUND);
		}
		const loadedLesson = loadLesson(response.data);
		this.setState(loadedLesson);
	}

	handleFieldChange = (e) => {
		this.state.lesson.setName(e.target.value);
	};

	render() {
		const { lesson, currentStep, steps, showDeleteLessonModal, showSuccessfullyPublished, copiedTool} = this.state;
		if (steps == null) {
			return null;
		}
		const toolOptions = currentStep.tools.map((tool) => tool.toSelectOption());
		const publishBtn = lesson.isPublished 
			? null 
			: (<Button variant="primary" onClick={this.publishLesson}>Publish</Button>);
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
				<InformationModal
					title={GeneralConstants.SUCCESSFUL_PUBLISH_LESSON_TITLE}
					message={GeneralConstants.SUCCESSFUL_PUBLISH_LESSON_MESSAGE}
					onHide={() => this.setState({ showSuccessfullyPublished: false })}
					show={showSuccessfullyPublished}
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
								<Button type="button" variant="success" onClick={this.onSaveLesson}>
									<i className="fas fa-save" />
								</Button>
							</Col>
						</Row>
					</Col>
					<Row>
						<Col lg={2}>
							<div className="editorLeftScroll brownBorder">
								<Card.Header><h6 className="m-0 font-weight-bold text-primary headings"> TOOLS </h6> </Card.Header>
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
								<Card>
									<Card.Header><h6 className="m-0 font-weight-bold text-primary headings">ACTION MANAGER</h6>
							</Card.Header>
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
										placeholder="Source"
										isSearchable={true}
										name="sources"
										options={toolOptions}
										onChange={(tool) => this.updateCurrentSource(tool.value)}
										value={currentStep.source ? currentStep.source.toSelectOption() : ''}
									/>

									<Select
										className="editorSelect"
										placeholder="Target"
										isSearchable={true}
										name="targets"
										options={toolOptions}
										onChange={(tool) => this.updateCurrentTarget(tool.value)}
										value={currentStep.target ? currentStep.target.toSelectOption() : ''}
									/>
								</Card>
								<div className="divider" />
								<Card>
									<Card.Header>
										<Row style={{justifyContent: 'space-evenly'}}>
									<h6 class="m-0 font-weight-bold text-primary headings"> STEPS </h6>
										<button
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
			</div>
		);
	}

	onSaveLesson = (e) => {
		e.preventDefault();
		const lessonInformation = {
			lesson: {
				lessonId: this.state.lesson.id,
				instructorEmail: this.props.email,
				name: this.state.lesson.name
			},
			stepInformation: this.constructSaveStepObject(),
		};
		this.saveLesson(lessonInformation);
	}

	saveLesson = (lessonInformation) => {
		axios.post('http://localhost:8080/updateLessonName', lessonInformation).then(
			(response) => console.log(response),
			(error) => console.log(error),
		);
	};

	constructSaveStepObject() {
		const { steps, lesson } = this.state;
		return steps.map((step, index) => {
			const toolList = this.constructToolListObject(step.tools, index);
			return {
				step: {
					stepIdentity: {
						lessonId: lesson.id,
						stepNumber: index
					},
					name: step.name,
					description: step.description,
					actionType: step.action,
					source: step.source,
					target: step.target,
					actionMeasurement: step.actionMeasurement
				},
				toolList: toolList
			};
		});
	}

	constructToolListObject(tools, stepNumber) {
		return tools.map((tool, index) => {
			const position = toScaledPosition(tool.position);
			return {
				toolIdentity: {
					layer: tool.layer,
					stepNumber: stepNumber,
					lessonId: this.state.lesson.id,
				},
				toolType: tool.type,
				x: position.x,
				y: position.y,
				name: tool.name,
				amount: tool.amount,
				color: tool.color,
				height: tool.height,
				width: tool.width
			};
		});
	}

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
		const position = new Position(x, y);
		const image = createImage(data.tool);
		const layer = this.state.currentStep.getTools().length;
		const tool = new Tool(data.tool, image, position,DEFAULT_TOOL_SIZE,DEFAULT_TOOL_SIZE,layer);
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
		steps.splice(index + 1,0, newStep);
		this.setState({ currentStep: newStep, steps});
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
	}

	cloneStep = (step) => {
		const clonedStep = step.clone();
		const {steps} = this.state;
		const index = steps.indexOf(step);
		steps.splice(index + 1,0,clonedStep);
		this.setState({steps});
	}

	updateCurrentAction = (action) => {
		const { currentStep } = this.state;
		currentStep.action = action.value;
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

	publishLesson = () => {
		const { lesson_id } = this.props.computedMatch.params;
		const body = {
			lessonId: lesson_id,
			email: this.props.email,
		};
		axios.post(Routes.SERVER + 'publishLesson', body).then(
			(response) => {
				this.state.lesson.isPublished = true;
				this.setState({showSuccessfullyPublished:  true});
			},
			(error) => console.log(error)
		);
	}

	cloneLesson = () => {
		const { lesson } = this.state;
		const body = {
			lessonId: lesson.id,
			instructorEmail: this.props.email,
		};
		axios.post(Routes.SERVER + 'cloneLesson/', body).then(
			(response) => console.log(response),
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

}

export default Editor;

import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup, Modal, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Container, Row, Col } from 'react-grid-system';
import Select from 'react-select';
import 'react-sticky-header/styles.css';
import SimpleInput from 'react-simple-input';
import HeaderBru from '../Components/Header.jsx';
import Catalog from '../Components/Catalog.jsx';
import Canvas from '../Components/Canvas.jsx';
import Routes from '../utils/RouteConstants.js';
import GeneralConstants from '../utils/GeneralConstants.js';
import EditorConstants from '../utils/EditorConstants.js';
import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Tool from '../Objects/Tool.js';
import Position from '../Objects/Position.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import ConfirmationModal from '../Components/ConfirmationModal.jsx';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';
import StringUtils from '../utils/StringUtils.js';
import { IMAGES } from '../Components/Tools.jsx';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { swapElements } from '../LilacArray.js';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

//UNDO REDO PUBLISH DELETE SIMULATE

const links = {
	Account: '/account'
};

class Editor extends Component {
	constructor(props) {
		super(props);
		const lesson = new Lesson();
		this.state = {
			lesson: lesson,
			currentStep: null,
			currentTool: null,
			steps: null,
			showDeleteLessonModal: false
		};

		this.onDropTool = this.onDropTool.bind(this);
	}

	handleNext() {}
	handleSimulate() {}

	componentDidMount() {
		const lesson_id = this.props.computedMatch.params.lesson_id;
		this.state.lesson.setId(lesson_id);
		axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
			(response) => {
				console.log(response);
				const stepInformation = response.data.stepInformation;
				var listStep = [];
				for (var i = 0; i < stepInformation.length; i++) {
					const getStep = stepInformation[i];
					var toolList = [];
					for (var j = 0; j < stepInformation[i].toolList.length; j++) {
						const images = IMAGES[stepInformation[i].toolList[j].toolType];
						const toolInput = new Tool(
							stepInformation[i].toolList[j].toolType,
							images,
							new Position(stepInformation[i].toolList[j].x, stepInformation[i].toolList[j].y),
							stepInformation[i].toolList[j].width,
							stepInformation[i].toolList[j].height,
							stepInformation[i].toolList[j].toolIdentity.layer,
							stepInformation[i].toolList[j].color,
							stepInformation[i].toolList[j].amount
						);
						toolList.push(toolInput);
					}
					const stepInput = new Step(
						getStep.step.name,
						getStep.step.description,
						toolList,
						getStep.step.actionType,
						getStep.step.source,
						getStep.step.target,
						getStep.step.actionMeasurement
					);
					listStep.push(stepInput);
				}
				const {lesson} = response.data;
				const currentLesson = new Lesson(lesson.name, lesson.lessonId);
				if (listStep.length == 0) {
					const createStep = new Step();
					this.setState({
						lesson: currentLesson,
						steps: [ createStep ],
						currentStep: createStep
					});
				} else {
					this.setState({
						lesson: currentLesson,
						steps: listStep,
						currentStep: listStep[0]
					});
				}
			},
			(error) => {
				console.log(error);
				this.props.history.push(Routes.NOT_FOUND);
			}
		);
	}

	render() {
		const { currentStep, steps, currentTool, showDeleteLessonModal } = this.state;
		if (steps == null) {
			return null;
		}
		const toolOptions = currentStep.tools.map((tool) => tool.toSelectOption());

		return (
			<div>
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<ConfirmationModal
					title={GeneralConstants.DELETE_LESSON_TITLE}
					message={GeneralConstants.DELETE_LESSON_MESSAGE}
					onHide={() => this.setState({ showDeleteLessonModal: false })}
					show={showDeleteLessonModal}
					onDelete={this.deleteLesson}
				/>
				<Container fluid={true}>
					<Row>
						<Col lg={2}>
							<Catalog />
						</Col>

						<Col lg={8}>
							<Canvas
								onDrop={this.onDropTool}
								tools={currentStep.getTools()}
							/>
						</Col>

						<Col lg={2}>
							<Col>
								<Col>
									<Card style={{ width: '14rem' }}>
										<Card.Header> Action Manager</Card.Header>
										<Form.Label>Select An Action</Form.Label>
										<Select
											isSearchable={true}
											name="actions"
											options={EditorConstants.ACTIONS}
											onChange={(action) => this.updateCurrentAction(action)}
											value={
												currentStep.action ? (
													{ label: currentStep.action, value: currentStep.action }
												) : (
													''
												)
											}
										/>
										<Form.Label> Select a Source </Form.Label>
										<Select
											isSearchable={true}
											name="sources"
											options={toolOptions}
											onChange={(tool) => this.updateCurrentSource(tool.value)}
											value={currentStep.source ? currentStep.source.toSelectOption() : ''}
										/>
										<Form.Label> Select a Target </Form.Label>
										<Select
											isSearchable={true}
											name="targets"
											options={toolOptions}
											onChange={(tool) => this.updateCurrentTarget(tool.value)}
											value={currentStep.target ? currentStep.target.toSelectOption() : ''}
										/>
									</Card>
								</Col>
							</Col>

							<Row>
								<Col>
									<Card style={{ width: '14rem' }}>
										<Card.Header>
											All Steps{' '}
											<button
												title="Add Step"
												className="buttonRound editorStepButton btn-primary"
												onClick={this.addStep}
											>
												+
											</button>
										</Card.Header>
										<SortableContainer onSortEnd={this.onDropStep} useDragHandle>
											{steps.map((step, index) => this.renderStep(step, index))}
										</SortableContainer>
									</Card>
								</Col>
							</Row>
							<Row>
								<Button onClick={() => this.setState({ showDeleteLessonModal: true })} variant="danger">
									{' '}
									Delete Lesson
								</Button>
							</Row>
						</Col>
					</Row>
					<button onClick={this.saveLesson}>SAVE</button>
				</Container>
			</div>
		);
	}

	saveLesson = (e) => {
		const lessonInformation = {
			lesson: {
				lessonId: this.state.lesson.id,
				instructorEmail: this.props.email,
				name: this.state.lesson.name
			},
			stepInformation: this.constructSaveStepObject()
		};
		e.preventDefault();
		axios.post('http://localhost:8080/updateLessonName', lessonInformation).then(
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	constructSaveStepObject() {
		const { steps } = this.state;
		return steps.map((step, index) => {
			const toolList = this.constructToolListObject(step.tools, index);
			return {
				step: {
					stepIdentity: {
						lessonId: this.state.lesson.id,
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
			return {
				toolIdentity: {
					layer: tool.layer,
					stepNumber: stepNumber,
					lessonId: this.state.lesson.id
				},
				toolType: tool.type,
				x: tool.position.getX(),
				y: tool.position.getY(),
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
				onDeleteStep={this.onDeleteStep}
				onFieldBlur={this.onFieldBlur}
				value={step}
				isDisabled={this.state.steps.length === 1}
			/>
		);
	};

	onDropTool(data) {
		const canvas = document.getElementById('canvas');
		const { left, top, width, height } = canvas.getBoundingClientRect();
		const { pageX, pageY } = window.event;
		const length = 125;

		let x, y;
		if (pageX - length / 2 < left) {
			x = 0;
		} else if (pageX + length / 2 > width + left) {
			x = width - length;
		} else {
			x = pageX - left - length / 2;
		}

		if (pageY - length / 2 < top) {
			y = 0;
		} else if (pageY + length / 2 > height + top) {
			y = height - length;
		} else {
			y = pageY - top - length / 2;
		}

		const position = new Position(x, y);
		let image = {};
		image.draw = IMAGES[data.tool].draw;
		image.properties = {};
		Object.keys(IMAGES[data.tool].properties).map(key => {
			image.properties[key] = IMAGES[data.tool].properties[key]
		})
		const layer = this.state.currentStep.getTools().length;
		const tool = new Tool(data.tool, image, position, length, length, layer);
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
		const { steps } = this.state;
		const currentStep = new Step();
		steps.push(currentStep);
		this.setState({ currentStep, steps, currentTool: null });
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
			step.name = EditorConstants.DEFAULT_STEP_NAME;
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
}

const DragHandle = sortableHandle(() => <span className="step-drag"></span>);
const SortableContainer = sortableContainer(({children}) => <ListGroup variant="flush">{children}</ListGroup>);
const SortableStep = sortableElement((props) => {
	const {stepIndex, isActive, onStepClick, onStepNameChange, onDeleteStep, onFieldBlur, value, isDisabled} = props;
	const deleteButton = isDisabled 
		? null
		: <Button className="close" onClick={(e) => onDeleteStep(e, value)}></Button>
	return (
		<ListGroup.Item active={isActive} key={stepIndex} index={stepIndex} onClick={onStepClick} as="li">
			<DragHandle/>
			<div index={stepIndex} className="divider"></div>
			<Form.Control
				index={stepIndex}
				className="step-name-form"
				onBlur={(e) => onFieldBlur(e, value)}
				onChange={onStepNameChange}
				value={value.toString()}
			/>
			{deleteButton}
		</ListGroup.Item>
	);
});

export default Editor;

/*
<Row>
  <Card style={{ height: '35vh' }}>
    <Card.Header> Editor Actions </Card.Header>
    <Card.Body style={{ height: '10vh' }}>
      <div className="divider" />
        <Button title="Publish"> Publish </Button>
          <div className="divider" />
          <Button title="Delete Lesson" className="btn-danger">
            {' '}
            Delete Lab{' '}
          </Button>
      <div className="divider" />
    </Card.Body>
  </Card>
</Row>
*/

/*
axios.get(Routes.SERVER + 'getLesson/' + lesson_id).then(
	(response) => {
		this.parseLessonInformation(response);
	},
	(error) => {
		console.log(error);
	}
);

parseLessonInformation = (response) => {
	let {lesson, stepInformation} = response.data;
	potentialInstructors = this.parseStepInformation(stepInformation);

	const courseInfo = {
		accessCode: course.courseId,
		title: course.name,
		description: course.description,
		courseInstructors: courseInstructors,
		courseStudents: courseStudents,
		potentialInstructors: potentialInstructors,
		potentialStudents:potentialStudents,
		lessons: courseLessons,
	}
	this.setState({
		courseInfo: courseInfo
	});
}*/

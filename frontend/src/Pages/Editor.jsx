import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup, Modal, Form } from 'react-bootstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Container, Row, Col } from 'react-grid-system';
import Select from 'react-select';
import 'react-sticky-header/styles.css';
import SimpleInput from 'react-simple-input';
import HeaderBru from '../Components/Header.jsx';
import Catalog from '../Components/Catalog.jsx';
import Canvas from '../Components/Canvas.jsx';
import Routes from '../utils/RouteConstants.js';
import EditorConstants from '../utils/EditorConstants.js';
import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Tool from '../Objects/Tool.js';
import Position from '../Objects/Position.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';
import StringUtils from '../utils/StringUtils.js';
import { IMAGES } from '../Components/Tools.jsx';
import axios from 'axios';

//UNDO REDO PUBLISH DELETE SIMULATE

const links = {
	Account: '/account'
};

class Editor extends Component {
	constructor(props) {
		super(props);
		const lesson = new Lesson();
		const step = new Step();
		this.state = {
			lesson: lesson,
			currentStep: step,
			currentTool: null,
			steps: [ step ],
			showCannotDeleteStep: false
		};

		this.onDropTool = this.onDropTool.bind(this);
	}

	handleNext() {}
	handleSimulate() {}

	render() {
		const { currentStep, steps, currentTool, showCannotDeleteStep } = this.state;
		const toolOptions = currentStep.tools.map((tool) => tool.toSelectOption());

		return (
			<div>
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />

				<CannotDeleteModal
					title={EditorConstants.CANNOT_DELETE_STEP_TITLE}
					message={EditorConstants.CANNOT_DELETE_STEP_MESSAGE}
					show={showCannotDeleteStep}
					handleClose={() => this.setState({ showCannotDeleteStep: false })}
				/>

				<Container fluid={true}>
					<Row>
						<Col lg={2}>
							<Catalog />
						</Col>

						<Col lg={8}>
							<Canvas onDrop={this.onDropTool} tools={currentStep.getTools()} />
							<ContextMenu id={EditorConstants.CONTEXT_MENU_ID}>
								<MenuItem onClick={this.handleMenuSource}>Make Source Tool</MenuItem>
								<MenuItem divider />
								<MenuItem onClick={this.handleMenuTarget}>Make Target Tool</MenuItem>
							</ContextMenu>
						</Col>

						<Col lg={2}>
							<Row>
								<Col>
									<Card style={{ width: '14rem' }}>
										<Card.Header> Action Manager</Card.Header>
										<Form.Label>Select An Action</Form.Label>
										<Select
											isSearchable={true}
											name="actions"
											options={EditorConstants.ACTIONS}
											onChange={(action) => this.updateCurrentAction(action)}
											value={{ label: currentStep.action, value: currentStep.action }}
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
							</Row>

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
										<ListGroup variant="flush">
											{steps.map((step, index) => this.renderStep(step, index))}
										</ListGroup>
									</Card>
								</Col>
							</Row>
						</Col>
					</Row>
					<button onClick={this.saveLesson}>SAVE</button>
					<button onClick={this.createLesson}>NEW</button>
				</Container>
			</div>
		);
	}

	createLesson = (e) => {
		const lesson = {
			instructorEmail: this.props.email,
			name: this.state.lesson.name
		};
		e.preventDefault();

		axios.post('http://localhost:8080/addLesson', lesson).then(
			(response) => {
				console.log(response);
				this.state.lesson.setId(response.data);
				console.log(this.state.lesson);
			},
			(error) => {
				console.log(error);
			}
		);
	};

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
				toolList: this.constructToolListObject(step.tools)
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
			<ListGroup.Item active={isActive} key={index} index={index} onClick={this.onStepClick} as="li">
				<Form.Control
					index={index}
					className="step-name-form"
					onBlur={(e) => this.onFieldBlur(e, step)}
					onChange={this.onStepNameChange}
					value={step.toString()}
				/>
				<Button variant="danger" onClick={(e) => this.onDeleteStep(e, step)}>
					{' '}
					Delete{' '}
				</Button>
			</ListGroup.Item>
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
		const image = IMAGES[data.tool];
		const layer = this.state.currentStep.getTools().length;
		const tool = new Tool(data.tool, image, position, length, length, layer);
		let currentStep = this.state.currentStep;
		currentStep.addTool(tool);
		this.setState({
			currentStep: currentStep
		});
	}

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
		if (this.state.steps.length === 1) {
			this.setState({ showCannotDeleteStep: true });
		} else {
			this.deleteStep(step);
		}
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
}

function CannotDeleteModal(props) {
	const { show, handleClose, title, message } = props;
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

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

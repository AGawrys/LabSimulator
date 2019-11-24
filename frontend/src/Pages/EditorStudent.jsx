import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { Container, Row, Col } from 'react-grid-system';
import Draggable, { DraggableCore } from 'react-draggable';
import { getLessons } from '../Validation/StudentEditorValidation.js';
import 'react-sticky-header/styles.css';
import HeaderBru from '../Components/Header.jsx';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';
import { isAbsolute } from 'path';

const green = 'green';
const red = 'red';
class EditorStudent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 0,
			currentLesson: 0,
			lessons: getLessons(),
			disable: 'true',
			feedback: 'false',
			feedbackColor: green,
			feedbackMsg: ''
		};
	}

	lessonStatus = (lessonIndex) => {
		if (lessonIndex == this.state.currentLesson) {
			return [ '#3483eb', 'white' ];
		} else {
			return [ 'white', 'grey' ];
		}
	};

	stepStatus = (lessonIndex, stepIndex) => {
		const { currentStep, currentLesson } = this.state;
		if (lessonIndex <= currentLesson && stepIndex < currentStep) {
			return '#46b056'; // done green
		} else if (lessonIndex == currentLesson && stepIndex == currentStep) {
			return '#3483eb'; // In progress
		} else {
			return 'grey';
		}
	};

	handleStart() {}
	handleDrag() {}
	handleStop = (data) => {
		let msg;
		const { x, y, srcElement } = data;
		console.log(srcElement.id);
		console.log('x: ' + x + ' y: ' + y);
		const { lessons, currentLesson, currentStep } = this.state;
		const step = lessons[currentLesson].steps[currentStep];
		if (srcElement.id !== step.source.name) {
			msg = 'That is not a ' + step.source.name + '. (you grabbed a ' + srcElement.id + ' )';
			this.setState({ feedbackMsg: msg });
			this.setState({ feedbackColor: red });
			this.setState({ feedback: true });
		} else if (!(x >= step.goalX.min && x <= step.goalX.max) || !(y >= step.goalY.min && y <= step.goalY.max)) {
			msg = 'Move it a little farther!';
			this.setState({ feedbackMsg: msg });
			this.setState({ feedbackColor: red });
			this.setState({ feedback: true });
		} else {
			msg = 'Very good! Hit next to move on.';
			if (currentStep === lessons[currentLesson].steps.length - 1) {
				msg =
					'You have completed Lesson: ' +
					lessons[currentLesson].name +
					' (Hit next to start the next lesson)';
			}
			this.setState({ disable: null });
			this.setState({ feedbackMsg: msg });
			this.setState({ feedbackColor: green });
			this.setState({ feedback: true });
		}
	};
	//console.log(lessons);
	//console.log("x: " + lessons[currentLesson].steps[currentStep].tools[0].x + " y: " +lessons[currentLesson].steps[currentStep].tools[0].y);
	handleClick() {
		const { currentLesson, currentStep, lessons } = this.state;
		if (currentStep + 1 >= lessons[currentLesson].steps.length) {
			this.setState({ currentStep: 0 });
			const next = currentLesson + 1;
			this.setState({ currentLesson: next });
		} else {
			const nextStep = currentStep + 1;
			this.setState({ currentStep: nextStep });
		}
		this.setState({ disable: 'true' });
		this.setState({ feedback: false });
	}

	render() {
		const { lessons, currentLesson, currentStep, disable, feedback, feedbackColor, feedbackMsg } = this.state;
		return (
			<div>
				<HeaderBru
					first=""
					second="Dashboard"
					link2="/StudentDashboard"
					third="Home"
					link3="/Home"
					link4="/StudentDashboard"
					btn="Exit"
					color="#01AFD8"
				/>
				<div className="Editor">
					<Row>
						<Col col-sm={2}>
							<div className="divider" />
							<div className="step-column" style={{ overflowY: 'scroll' }}>
								<p style={{ margin: 1, padding: 0, color: 'grey', fontWeight: 'bold' }}>
									Seasonal Training{' '}
								</p>
								<p style={{ margin: 0, padding: 0, color: 'grey', fontSize: 13 }}>3 Lessons </p>
								<div className="list-entry">
									{lessons.map((lab, i) => (
										<div
											className="list-entry"
											style={{
												backgroundColor: this.lessonStatus(i)[0],
												color: this.lessonStatus(i)[1]
											}}
										>
											<Collapsible
												open={i == currentLesson}
												trigger={lab.name}
												classParentString="collapsible-list"
											>
												<ol style={{ margin: 0, padding: 0 }}>
													{lab.steps.map((step, j) => (
														<li
															className="step-entry"
															style={{ color: this.stepStatus(i, j) }}
														>
															{step.name}
														</li>
													))}
												</ol>
											</Collapsible>
										</div>
									))}
								</div>
							</div>
						</Col>
						<Col sm={8}>
							<div className="divider" />
							<Card>
								<Card.Body
									id="canvas"
									style={{ flex: 1, height: '65vh', width: '165vh', justifyContent: 'center' }}
								>
									<p> {lessons[currentLesson].steps[currentStep].name}</p>
									<div style={{ height: '65vh', width: '70vh' }}>
										{lessons[currentLesson].steps[currentStep].tools.map((tool) => (
											<Draggable
												bounds="#canvas"
												axis="both"
												defaultPosition={{ x: tool.x, y: tool.y }}
												grid={[ 25, 25 ]}
												scale={1}
												onStart={this.handleStart}
												onDrag={this.handleDrag}
												onStop={this.handleStop}
											>
												<div>
													<img
														id={tool.name}
														src={tool.src}
														key={tool.name}
														style={{ height: tool.height }}
													/>
												</div>
											</Draggable>
										))}
									</div>
									{feedback ? <p style={{ color: feedbackColor }}> {feedbackMsg} </p> : <div />}
								</Card.Body>
							</Card>
							<Button
								style={{ backgroundColor: 'black', width: '40vh', justifySelf: 'flex-end' }}
								disabled={disable}
								onClick={this.handleClick.bind(this)}
								block
								bsSize="small"
								type="button"
							>
								NEXT STEP
							</Button>
						</Col>
						<Col>
							<div className="divider" />
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
export default EditorStudent;

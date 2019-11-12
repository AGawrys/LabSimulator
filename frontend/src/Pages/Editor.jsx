import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup, Modal, Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import 'react-sticky-header/styles.css';
import SimpleInput from 'react-simple-input';
import HeaderBru from '../Components/Header.jsx';
import tool1 from '../Styles/Images/jar.svg';
import tool2 from '../Styles/Images/measuredPitcher.svg';
import tool3 from '../Styles/Images/coffee-machine.svg';
import tool4 from '../Styles/Images/cup.svg';
import Routes from '../utils/RouteConstants.js';
import EditorConstants from '../utils/EditorConstants.js';
import Step from '../Objects/Step.js';
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';
import StringUtils from '../utils/StringUtils.js';

//UNDO REDO PUBLISH DELETE SIMULATE

const links = {
	Account: '/account'
};

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			CourseName: 'Seasonal Training',
			currentStep: '',
			steps: [],
			tools: []
		};
	}

	handleNext() {}
	handleSimulate() {}

	render() {
		const {currentStep} = this.state;
		return (
			<div>
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<section>
					<div className="editor">
						<Container className="page-grid">
							<Row className="editorActionRow">
								<button type="button" className="btn btn-secondary">
									Redo Action
								</button>
								<button type="button" className="btn btn-secondary">
									Undo Action
								</button>
								<button type="button" className="btn btn-info">
									Save Lab
								</button>
								<button type="button" className="btn btn-info">
									Load Lab
								</button>
								<button type="button" className="btn btn-success">
									Publish Lab
								</button>
								<button type="button" className="btn btn-danger">
									Delete Lab
								</button>
								<button type="button" className="btn btn-primary">
									Simulate Lab
								</button>
							</Row>
							<Row>
								<Col col-sm={4}>
									<Row>
										<Col className="tool-column" style={{ margin: 0, padding: 0 }}>
											<div style={{ width: '20vh', flex: 1, flexDirection: 'row' }}>
												<SimpleInput style={{ width: '10vh' }} placeholder="search" />
											</div>
											<img src={tool1} style={{ height: '40px' }} />
											<img src={tool2} style={{ height: '40px' }} />
											<img src={tool3} style={{ height: '40px' }} />
											<img src={tool4} style={{ height: '40px' }} />
										</Col>
									</Row>
									<div className="divider" />
								</Col>
								<Col sm={8}>
									<Card>
										<Card.Header>
											<Form.Control
												id="step-name-form"
												onBlur={this.onFieldBlur}
												onChange={this.onStepNameChange} 
												value={currentStep.toString()} 
											/>
										</Card.Header>
										<Card.Body style={{ height: '65vh' }}>
											This is where the canvas will be.
										</Card.Body>
									</Card>
								</Col>
								<Col sm={2}>
									<Row>
										<Card style={{ width: '14rem', height: '36vh' }} />
									</Row>
									<div className="divider" />
									<Row>
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
												{
													this.state.steps.map((step, index) => this.renderStep(step,index))
												}
											</ListGroup>
										</Card>
									</Row>
									<div className="divider" />
								</Col>
							</Row>
						</Container>
					</div>
				</section>
			</div>
		);
	}

	renderStep = (step, index) => {
		const isActive = step === this.state.currentStep;
		return (
          <ListGroup.Item
          	key={index} 
          	index={index}
          	onClick={this.onStepClick}
          	as="li" 
          	active={isActive}> 
          		{step.toString()} 
          </ListGroup.Item>
      );
	}

	addStep = () => {
		const {steps} = this.state;
		const currentStep = new Step();
		steps.push(currentStep);
		this.setState({currentStep, steps});
	}

	onStepClick = (e) => {
		const index = e.target.getAttribute("index");
      	const desiredStep = this.state.steps[index];
      	console.log(desiredStep);
      	this.setState({
        	currentStep: desiredStep,
      	});
	}

	onStepNameChange = (e) => {
		const {currentStep} = this.state;
		if (!currentStep) {
			return false;
		}
		currentStep.name = e.target.value
		this.setState({currentStep});
	}

	onFieldBlur = (e) => {
		const {currentStep} = this.state;
		if (StringUtils.isEmpty(e.target.value) && currentStep) {
			currentStep.name = EditorConstants.DEFAULT_STEP_NAME;
			this.setState({currentStep});
		}	
	}

	deleteCurrentStep = () => {
      const {currentStep, steps} = this.state;
      const index = steps.indexOf(currentStep);
      steps.splice(index);
      const newCurrent = steps.length > 0 ? steps[steps.length - 1] : null;
      this.setState({
        currentStep: newCurrent, 
      });
    }
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

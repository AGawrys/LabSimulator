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
import FormModal from '../Components/FormModal.jsx';
import ShakeModal from '../Components/ShakeModal.jsx';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';

//UNDO REDO PUBLISH DELETE SIMULATE

const links = {
	Account: '/account'
};

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			CourseName: 'Seasonal Training',
			showAddStepModal: false,
			currentStep: '',
			steps: [],
			tools: []
		};
		this.stepDescription = React.createRef();
	}

	handleNext() {}
	handleSimulate() {}

	handleAddStep = (e) => {
		e.preventDefault();
		this.state.steps.push(this.stepDescription.current.value);
		this.setState({ showAddStepModal: false });
	};

	getAddStepForm() {
		return (
			<div>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							ref={this.stepDescription}
							minLength="5"
							required
							placeholder="Enter step description (i.e pour water into cup)"
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit">
						Add
					</Button>
				</Modal.Footer>
			</div>
		);
	}

	getCurrentStepForm() {}

	render() {
		return (
			/*<div class="editor">
                <div class="header">

                </div>

                <div class="action-area">
                    <div class="subheader">Action Manager</div>
                    <div class="action-manager">

                    </div>

                </div>

                <div class="details">
                </div>

                <div class="steps">

                </div>

                <div class="canvas-area">
                </div>

                <div class="catalog-area">
                    <div class="subheader">Tools</div>
                    <Catalog />
                </div>

                <div class="layer">
                  
                </ xdiv>                
          </div>*/
			<div>
				<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} links={links} />
				<FormModal
					title="Create Course"
					show={this.state.showAddStepModal}
					onHide={() => this.setState({ showAddStepModal: false })}
					submitAction={this.handleAddStep}
				>
					{this.getAddStepForm()}
				</FormModal>
				<ShakeModal show={false} progressNeeded={500}/>
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
										<Card.Header>Course: {this.state.CourseName} </Card.Header>
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
													onClick={() => {
														this.setState({ showAddStepModal: true });
													}}
												>
													{' '}
													+
												</button>
											</Card.Header>
											<ListGroup variant="flush">
												{this.state.steps.map((step) => (
													<ListGroup.Item> {step} </ListGroup.Item>
												))}
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

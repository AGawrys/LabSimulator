import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup, Modal, Form} from 'react-bootstrap';
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
import Step from '../objects/Step.js';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';


const links = {
  Account: "/account",
}

class Editor extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
        CourseName: 'Seasonal Training',
        showAddStepModal: false,
        showEditStepModal: false,
        currentStep: null, 
        steps: [],
        tools: [],
    	};
      this.stepDescription = React.createRef();
      this.editStepDescription = React.createRef();
    }

    handleNext() {}
    handleSimulate() {}

    handleAddStep = (e) => {
      e.preventDefault();
      const newStep = new Step(this.stepDescription.current.value);
      this.state.steps.push(newStep);
      this.setState({showAddStepModal: false});
    }

    handleEditStep = (e) => {
      e.preventDefault();
      const newDescription = this.editStepDescription.current.value;
      this.state.currentStep.description = newDescription;
      this.setState({showEditStepModal: false});
    }


    getCurrentStepForm() {

    }
    
    render() {
      return (
        <div>
          <HeaderBru 
            home={Routes.INSTRUCTOR_DASHBOARD} 
            isLoggedIn={true}
            links={links} 
          />
          <FormModal 
            title="Add Step" 
            show={this.state.showAddStepModal} 
            onHide={() => this.setState({showAddStepModal:false})}
            onSubmit={this.handleAddStep}
          >
            {this.getAddStepForm()}
          </FormModal>
          <ShakeModal show={true}/>
          <FormModal
            title="Edit Step"
            show={this.state.showEditStepModal}
            onHide={() => this.setState({showEditStepModal:false})}
            onSubmit={this.handleEditStep}
          >
            {this.getEditStepForm()}
          </FormModal>
          <section>
            <div className="editor"> 
          <Container className="page-grid">
              <Row>
              <Col col-sm={4}>
                <Row>
                    <Card style={{ height: '35vh'}}>
                      <Card.Header> Editor Actions </Card.Header>
                      <Card.Body style={{ height: '10vh' }}>.
                        <Button title="Add Step" onClick={() => {
                          this.setState({showAddStepModal: true})}}
                        > 
                          Add Step 
                        </Button>
                        <div className="divider" />
                        <Button title="Publish"> Publish </Button>
                        <div className="divider" />
                        <Button title="Delete Lesson" className="btn-danger"> Delete Lab </Button>
                        <div className="divider" />
                      </Card.Body>
                    </Card>
                </Row>
                <div className="divider" />
                <Row>
                    <Col className="tool-column" style={{margin: 0, padding: 0}}>
                      <div style={{width: '20vh', flex: 1, flexDirection: 'row'}}>
                      <SimpleInput style={{width:'10vh'}} placeholder='search' />
                      </div>
                    <img src={tool1} style={{ height: '40px', }}/>
                    <img src={tool2} style={{ height: '40px', }}/>
                    <img src={tool3} style={{ height: '40px', }}/>
                    <img src={tool4} style={{ height: '40px', }}/>
                    </Col>
                </Row>
                <div className="divider" />
              </Col>
              <Col sm={8}>
              <Card>
                <Card.Header>Course: {this.state.CourseName} </Card.Header>
                <Card.Body style={{ height: '65vh' }}>This is where the canvas will be.</Card.Body>
                </Card>
                <Row>
                <Button style={{ backgroundColor: 'black', width: '20vh'}} onClick={this.handleSimulate.bind(this)} block bsSize="small" type="button">
                       SIMULATE
                     </Button>
                <div className="divider" />
                <Button style={{ backgroundColor: 'black', width: '20vh'}} onClick={this.handleNext.bind(this)} block bsSize="small" type="button">
                       NEXT STEP
                     </Button>
                </Row>
              </Col>
            <Col sm={2}>
              <Row>
                  <Card style={{ width: '14rem', height: '36vh'}}>
                  </Card>
                  </Row>
                  <div className="divider" />
                  <Row>
                  <Card style={{ width: '14rem' }}>
                    <Card.Header>All Steps</Card.Header>
                    <ListGroup>
                      {
                        this.state.steps.map((step, index) => this.renderStep(step, index))
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

    onStepClick = (e) => {
      const index = e.target.getAttribute("index");
      const desiredStep = this.state.steps[index];
      this.setState({
        currentStep: desiredStep,
        showEditStepModal: true
      }); 
    }

    renderStep = (step, index) => {
      return (
          <ListGroup.Item index={index} key={index} onClick={e => this.onStepClick(e)}>
            {step.toString()}
          </ListGroup.Item>
      )
    }

    getEditStepForm = () => {
      const {currentStep} = this.state;
      return (
        <div>
          <Modal.Body>
            <Form.Group>
              <Form.Label> Step Description </Form.Label>
              <Form.Control
                autoFocus={true}
                ref={this.editStepDescription}
                defaultValue={currentStep ? currentStep.description : ''}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="danger" onClick={this.deleteCurrentStep}>Delete Step</Button> <br/>
              <Form.Label> Deleting this step will delete all dependent steps as well </Form.Label> 
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit Changes
            </Button>
          </Modal.Footer>
        </div>
      );
    }

    getAddStepForm() {
      return (
        <div>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                autoFocus={true} 
                ref={this.stepDescription} 
                required placeholder="Enter step description (i.e pour water into cup)"/>
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

    deleteCurrentStep = () => {
      const {currentStep, steps} = this.state;
      const index = steps.indexOf(currentStep);
      steps.splice(index);
      this.setState({
        currentStep: null,
        showEditStepModal: false, 
      });
    }
}
export default Editor;
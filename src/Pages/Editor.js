import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card, ListGroup , FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import title from '../Styles/Images/brü.svg';
import coffeeProcess from '../Styles/Images/coffeeProcess.gif';
import Popup from '../Components/Popup.js';
import HeaderBru from '../Components/Header.js';
import tool1 from '../Styles/Images/jar.svg';
import tool2 from '../Styles/Images/measuredPitcher.svg';
import tool3 from '../Styles/Images/coffee-machine.svg';
import tool4 from '../Styles/Images/cup.svg';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';

class Editor extends Component {
    constructor(props) {
		super(props);
		this.state = {
      loginPopup: false,
      loginbtn: 'Exit',
      CourseName: 'Seasonal Training',
      Steps: ['Pour water into the pitcher', 'Shake the cup'],
      Actions: [{Type: 'Pour', To: 'cup', From: 'pitcher'}, {Type: 'Shake', Item: 'cp'}],
      currentStep: 1
		};
    }

    handleLogin() {

    }

    togglePopup() {  
      let login = "Login";
      if(!this.state.showPopup) { login = "Cancel"; }
      this.setState({  
           showPopup: !this.state.showPopup, 
           loginbtn: login,
           errorLogin: "Invalid Credentials",
           actionType: "POUR",
           step: "Pour the milk into the cup using the pitcher"
      });  
    } 
    
    render() {
      return (
        <StickyHeader
          header={
            <HeaderBru
              first=''
              second=''
              third=''
              btn='Exit'
              clickHeaderBtn={this.handleLogin.bind(this)}
            />
            // <div className="Header-root">
            // <div className="Home-navbar">
            //   <img src={title} className="Home-header-logo" style={{ height: '50px', }} alt="logo" />
            //   <Button style={{ backgroundColor: 'black', width: '90px', height: '40px'}} onClick={this.togglePopup.bind(this)} block bsSize="small" type="button">
            //         {this.state.loginbtn}
            //       </Button>
            // </div>
            // </div>
          }
        >
        <section>
          <div className="editor"> 
        <Container className="page-grid">
            <Row>
            <Col col-sm={2}>
              <Row>
                  <Card style={{ height: '35vh' }}>
                  <Card.Header>Step: {this.state.currentIndex}</Card.Header>
                  <Card.Body style={{ height: '10vh' }}>.
                  Pour the milk into the cup using the pitcher.
                  </Card.Body>
                </Card>
              </Row>
              <div className="divider" />
              <Row>
                  <Card style={{ height: '35vh' }}>
                  <Card.Header>Add Tool {this.state.currentIndex}</Card.Header>
                  <Card.Body style={{ height: '10vh' }}>.
                  <img src={tool1} style={{ height: '40px', }}/>
                  <img src={tool2} style={{ height: '40px', }}/>
                  <img src={tool3} style={{ height: '40px', }}/>
                  <img src={tool4} style={{ height: '40px', }}/>
                  </Card.Body>
                </Card>
              </Row>
              <div className="divider" />
              <Button style={{ backgroundColor: 'black'}} onClick={this.togglePopup.bind(this)} block bsSize="small" type="button">
                     SIMULATE
                   </Button>
            </Col>
            <Col sm={8}>
            <Card>
              <Card.Header>Course: {this.state.CourseName} </Card.Header>
              <Card.Body style={{ height: '65vh' }}>This is where the canvas will be.</Card.Body>
              </Card>
              <Button style={{ backgroundColor: 'black'}} onClick={this.togglePopup.bind(this)} block bsSize="small" type="button">
                     NEXT STEP
                   </Button>
            </Col>
          <Col sm={2}>
            <Row>
                <Card style={{ width: '14rem', height: '36vh'}}>
                  <Card.Header>Add Action</Card.Header>
                  <div className="divider" />
                  <DropdownButton id="dropdown-basic-button" title="Action Type">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                <div className="divider" />
                <DropdownButton id="dropdown-basic-button" title="Source">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                  <div className="divider" />
                  <DropdownButton id="dropdown-basic-button" title="Target">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                </Card>
                </Row>
                <div className="divider" />
                <Row>
                <Card style={{ width: '14rem' }}>
                  <Card.Header>All Steps</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Step 1</ListGroup.Item>
                    <ListGroup.Item>Step 2</ListGroup.Item>
                    <ListGroup.Item>Step 3</ListGroup.Item>
                  </ListGroup>
                </Card>
                </Row>
                <div className="divider" />
                   <Button style={{ backgroundColor: 'black'}} onClick={this.togglePopup.bind(this)} block bsSize="small" type="button">
                     FINISH
                   </Button>
            </Col>
            </Row>
          </Container> 
          </div>
        </section>
        </StickyHeader>
      );
    }
}
export default Editor;
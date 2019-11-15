import React from "react";
import 'react-sticky-header/styles.css';
import Lesson from "../Objects/Lesson.js"
import Position from "../Objects/Position.js"
import Tool from "../Objects/Tool.js"
import StickyHeader from 'react-sticky-header';
import SimpleInput from 'react-simple-input';
import HeaderBru from '../Components/Header.jsx';
import tool1 from '../Styles/Images/jar.svg';
import tool2 from '../Styles/Images/measuredPitcher.svg';
import tool3 from '../Styles/Images/coffee-machine.svg';
import tool4 from '../Styles/Images/cup.svg';
import Canvas from "../Components/Canvas.jsx"
import Catalog from "../Components/Catalog.jsx"
import TaperedCupTool from "../Components/TaperedCupTool.jsx"
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';
import "../Styles/editor.css"

const ToolTypes = {
  "TaperedCup": <TaperedCupTool />
}

class Editor extends React.Component {
    constructor(props) {
          super(props);

          const lesson = new Lesson()
          this.state = {
              lesson: lesson,
              currentStep: lesson.getSteps().length? 1 : null 
          };

          this.onDropTool = this.onDropTool.bind(this)
    }

    onDropTool(data) {
        const e = window.event;
        let lesson = this.state.lesson;

        const position = new Position(e.pageX, e.pageY);
        const layer = this.state.lesson.tools.length;
        const tool = new Tool(data["tool"] , position, layer);

        lesson.addTool(tool);
        this.setState({
            lesson: lesson
        });
    }
    
    render() {
        const tools = this.state.lesson.getTools();

        return (
            <div class="editor">
                <div class="header">
                </div>

                <div class="action-area">
                    <div class="subheader">Action Manager</div>
                </div>

                <div class="details">
                </div>

                <div class="steps">

                </div>

                <Canvas className="canvas-area"
                        onDrop={this.onDropTool}
                        tools={tools}
                />

                <div class="catalog-area">
                    <div class="subheader">Tools</div>
                    <Catalog />
                </div>

          </div>
        );
    }
}

export default Editor;

/* <StickyHeader
          header={
            <HeaderBru
              first='   '
              second='Dashboard'
              link2='/InstructorDashboard'
              third='Home'
              link3="/Home"
              link4="/InstructorDashboard"
              btn='Exit'
              color= '#01AFD8'
              clickHeaderBtn={this.handleNext.bind(this)}
            />
          }
        >
        <section>
          <div className="editor"> 
        <Container className="page-grid">
            <Row>
            <Col col-sm={4}>
              <Row>
                  <Card style={{ height: '35vh'}}>
                  <Card.Header>Step {this.state.currentStep}:</Card.Header>
                  <Card.Body style={{ height: '10vh' }}>.
                  Pour the milk into the cup using the pitcher.
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
                    <ListGroup.Item>Pour milk into cup using pitcher </ListGroup.Item>
                    <ListGroup.Item>Add caramel syrup</ListGroup.Item>
                    <ListGroup.Item>Add espresso shot</ListGroup.Item>
                  </ListGroup>
                </Card>
                </Row>
                <div className="divider" />
                   
            </Col>
            </Row>
          </Container> 
          </div>
        </section>
        </StickyHeader> */
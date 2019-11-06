import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Card} from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { Container, Row, Col } from 'react-grid-system';
import 'react-sticky-header/styles.css';
import HeaderBru from '../Components/Header.jsx';
import '../App.css';
import '../Styles/HomeStyle.css';
import '../Styles/EditorStyle.css';

class EditorStudent extends Component {
    constructor(props) {
		super(props);
		this.state = {
             currentStep: 1
		};
    }
    
    handleClick() {}
    render() {
      return (
          <div>
            <HeaderBru
              first=''
              second='Dashboard'
              link2="/StudentDashboard"
              third='Home'
              link3="/Home"
              link4="/StudentDashboard"
              btn='Exit'
              color= '#01AFD8'
            />
          <div className="Editor">
            <Row>

            <Col col-sm={2} >
            <div className="divider" />
                <div className="step-column" style={{ overflowY: 'scroll' }}>
                <p style={{ margin: 1, padding: 0, color:"grey", fontWeight: "bold"}}>Seasonal Training </p>
                <p style={{ margin: 0, padding: 0, color:"grey", fontSize:13}}>3 Lessons </p> 
                  <div className="list-entry" style={{ backgroundColor: '#00B26D ', color: 'white'}}>
                  <Collapsible trigger="Lesson 1: Caramel Macchiato" classParentString="collapsible-list">
                    <ol style={{ margin: 0, padding: 0}}>
                        <li className="step-entry"> 1. Pour milk into cup </li>
                        <li className="step-entry"> 2. Add syrup to cup</li>
                        <li className="step-entry"> 3. Add expresso shot</li>
                    </ol>
                </Collapsible>
                </div>
                <div className="list-entry">
                  <Collapsible trigger="Lesson 2: Pumpkin Spice Latte" classParentString="collapsible-list">
                    <ol style={{ margin: 0, padding: 0}}>
                        <li className="step-entry"> 1. Add 3 pumps of syrup</li>
                        <li className="step-entry"> 2. Brew expresso shot at machine</li>
                        <li className="step-entry"> 3. Add expresso shot to cup</li>
                        <li className="step-entry"> 4. Froth the milk</li>
                        <li className="step-entry"> 5. Pour milk into coffee cup</li>
                        <li className="step-entry"> 6. Sprinkle cinamon on top</li>
                    </ol>
                </Collapsible>
                </div>
                <div className="list-entry">
                <Collapsible trigger="Lesson 3: London Fog Latte" classParentString="collapsible-list"> 
                    <ol style={{ margin: 0, padding: 0}}>
                        <li className="step-entry"> 1. Boil water</li>
                        <li className="step-entry"> 2. Steep Tea bag in water</li>
                        <li className="step-entry"> 3. Froth the milk</li>
                        <li className="step-entry"> 4. Pour milk into tea cup</li>
                    </ol>
                </Collapsible>
                </div>              
                    </div>
            </Col>
            <Col sm={8}>
            <div className="divider" />
            <Card>
              <Card.Header>Course: {this.state.CourseName} </Card.Header>
              <Card.Body style={{ height: '65vh' }}>This is where the canvas will be.</Card.Body>
              </Card>
              <Button style={{ backgroundColor: 'black', width: '40vh', justifySelf: 'flex-end'}} onClick={this.handleClick.bind(this)} block bsSize="small" type="button">
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
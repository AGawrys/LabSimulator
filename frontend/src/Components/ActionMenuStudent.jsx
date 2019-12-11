import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';

class ActionMenuStudent extends React.Component {
    constructor(props) {
    super(props);
    const { tool, show } = this.props;
    this.state = {
        show,
    };
    }

    pourAction = () => {
        const {tool }  = this.props;
        this.props.pourAction(tool);
    }
    stirAction = () => {
        const {tool }  = this.props;
        this.props.stirAction(tool);
    }
    shakeAction = () => {
        const {tool }  = this.props;
        this.props.shakeAction(tool);
    }
    blendAction = () => {
        const {tool }  = this.props;
        this.props.blendAction(tool);
    }
    render() {
        const {show} = this.props;
        return (
            show ? (<div style={{width: "20vh"}}>
                <Col>
                    <Button style={{ backgroundColor: 'steelblue', alignSelf: "center", width: "15vh" }} block bsSize="large" onClick={this.shakeAction}>
                        SHAKE
                    </Button>
                    <Button style={{ backgroundColor: 'steelblue', alignSelf: "center", width: "15vh" }} block bsSize="large" onClick={this.stirAction}>
                        STIR
                    </Button>
                    <Button style={{ backgroundColor: 'steelblue', alignSelf: "center", width: "15vh" }} block bsSize="large" onClick={this.blendAction}>
                        BLEND
                    </Button>
                    
                </Col>
            </div>) : null
        )
    }
}
export default ActionMenuStudent;
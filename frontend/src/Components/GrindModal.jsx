import React from "react"
import {Modal, Button} from 'react-bootstrap';
import Tool from './Tool.jsx';

class GrindModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            started: false,
            finished: false,
            sourceCopy: this.props.source.clone(),
            animation: null,
        };
        
        this.resetState = this.resetState.bind(this);
        this.onGrind = this.onGrind.bind(this);
        this.onGrindEnd = this.onGrindEnd.bind(this);
    }
    
    render() {
        const {show} = this.props;
        const {started, finished, sourceCopy} = this.state;
        const {grindProgress} = sourceCopy.image.animation;
        
        return (
            <Modal
                show={show}
                onHide={this.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <div style={{ width: 400 }}>
                        <h3>Grind the coffee beans!</h3>
                        <h4 className="failedText" hidden={!started || !finished || (finished && grindProgress === 1)}>
                            You have failed! Try again!
                        </h4>
                        <h4 className="successText" hidden={!started || !finished || (finished && grindProgress !== 1)}>
                            You completed the action!
                        </h4>
                    </div>
                </Modal.Header>
                <Modal.Body id="blend-body" style={{height: '500px', width: '750px'}}>
                    <Tool
                        tool={sourceCopy}
                    />
                    <Button 
                        variant="primary" 
                        disabled={finished} 
                        onMouseDown={this.onGrind}
                        onMouseUp={this.onGrindEnd}
                    >
                        Grind
                    </Button>               
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning"
                        disabled={!started || !finished || (finished && grindProgress === 1)}
                        hidden={!started || !finished || (finished && grindProgress === 1)}
                        onClick={() => {
                            this.resetState();
                        }
                    }>
                        Retry
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!started || !finished || (finished && grindProgress !== 1)}
                        onClick={() => {
                            this.resetState();
                            this.props.onHide();
                            this.props.onSuccess();
                        }
                    }>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    resetState() {
        this.setState({
            started: false,
            finished: false,
            sourceCopy: this.props.source.clone(),
            animation: null
        });
    }
    
    onHide = () => {
        this.resetState();
        this.props.onHide();
    }

    onGrind() {
        const {started, sourceCopy} = this.state;
        const {Fill}  = sourceCopy.image.properties;
        const {grindProgress, isEmpty, reset}  = sourceCopy.image.animation;

        if (!started) {
            this.setState({
                started: true
            });
        }

        if (grindProgress < 1) {
            sourceCopy.image.animation.shake = true;
            sourceCopy.image.animation.reset = !reset;
        }

        this.setState({
            animation: window.requestAnimationFrame(this.onGrind)
        });

        if (grindProgress < 1) {
            sourceCopy.image.animation.grindProgress += .01 * (1 / Fill);
        } else if (grindProgress >= 1 && !isEmpty) {
            sourceCopy.image.animation.grindProgress = 1;
            sourceCopy.image.animation.isEmpty = true;
        }
        this.setState({sourceCopy});
    }

    onGrindEnd() {
        window.cancelAnimationFrame(this.state.animation);
        this.setState({
            finished: true,
            animation: null
        });
    }
}

export default GrindModal;
import React from "react"
import {Row, Modal, Button} from 'react-bootstrap';
import Tool from './Tool.jsx';
import {copyImage} from '../Components/Tools.jsx';
import Timer from 'react-compound-timer';
import { isCollisionDetected } from '../utils/CanvasUtils.js';
import Position from '../Objects/Position.js';



class BrewModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            started: false,
            failed: false,
            isActionComplete: false,
            isAnimationComplete: true,
        };
        const {source, target} = this.props;
        source.position = new Position(50,50);
        target.position = new Position(400,300);
    }
    
    render() {
        const { isActionComplete, failed, started, isAnimationComplete } = this.state;
        const { show, onComplete, timer, source, target } = this.props;
        const shakingClass = isActionComplete && !isAnimationComplete ? "shaking" : "";

        return (
            <Timer
                startImmediately={false}
                direction="backward"
                checkpoints={[
                {
                    time: 0,
                    callback: () => this.handleStateChange()
                }
                ]}
            >
                {({ start, resume, pause, stop, reset, getTimerState, getTime, setTime }) =>  {
                    if (started && getTimerState() != 'PLAYING') {
                        start();
                    }
                    if (isActionComplete) {
                        pause();
                    }
                    return (
                    <Modal
                        onShow={() => {
                            setTime(this.props.timer * 1000 + 999);
                            reset();
                            stop();
                        }}
                        show={true}
                        onHide={() => {
                            reset();
                            stop();
                            this.resetProgress();
                        }}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <div style={{ width: 400 }}>
                                <div>
                                    <Timer.Seconds /> seconds
                                </div>
                                <h4 className="failedText" hidden={!failed}>
                                    You have failed! Try again!
                                </h4>
                                <h4 hidden={!isActionComplete || isAnimationComplete}>
                                    Brewing the coffee...
                                </h4>
                                <h4 className="successText" hidden={!isActionComplete || !isAnimationComplete}>
                                    <i className="fa fa-check" aria-hidden="true"></i> &nbsp;
                                    Successfully brewed coffee!
                                </h4>
                            </div>
                      </Modal.Header>
                      <Modal.Body id="brew-body" style={{height: '500px', width: '750px'}}>
                            <h5> Drag the grounds to the top of the coffee machine </h5>
                            {!isActionComplete ? (
                                <React.Fragment>
                                    <Tool
                                        draggable
                                        actionTool
                                        defaultPosition={{x: 50, y:50}}
                                        boundId="#brew-body"
                                        tool={source}
                                        onDrag={this.onDrag}
                                        onDrop={this.onDrop}
                                    />
                                    <Tool 
                                        draggable
                                        defaultPosition={{x: 400, y:300}}
                                        actionTool
                                        boundId="#brew-body"
                                        tool={target}
                                        onStart={() => false}
                                    /> 
                                </React.Fragment>
                            ) : null}
                            <div className="coffee-machine-container" hidden={!isActionComplete}>
                                <img style={{width: 300, height: 300}} className={shakingClass} src={"http://www.kuppa.ph/img/location.png"}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" disabled={!failed} hidden={!failed} onClick={() => {
                                reset();
                                pause();
                                this.resetState();
                            }}>
                                Retry
                            </Button>
                            <Button variant="primary" onClick={() => {
                                reset();
                                pause();
                                this.onSuccess();
                            }} disabled={!isActionComplete && !isActionComplete}>
                                Continue
                            </Button>
                        </Modal.Footer>
                  </Modal>
                );
                }}
            </Timer>        
        );
    }

    onSuccess = () => {
        this.resetState();
        this.props.onSuccess();
    }

    resetState = () => {
        this.setState({
            started: false,
            failed: false,
            isActionComplete: false,
        })
    }

    resetProgress = () => {
        this.resetState();
        this.props.onHide();
    }

    handleStateChange = () => {
        if (this.state.isActionComplete) {
            return;
        }
        this.setState({ failed: true }); //you get the value here when state changes in B(Child) component
    };

    onDrag = () => {
        if (!this.state.started) {
            this.setState({started: true});
        }
    }

    onDrop = () => {
        const {source, target} = this.props;
        if (isCollisionDetected(this.props.source, this.props.target)) {
            this.setState({isActionComplete: true, isAnimationComplete: false});
            setTimeout(() => this.setState({isAnimationComplete: true}), 3000);
        }
    }
}

export default BrewModal;
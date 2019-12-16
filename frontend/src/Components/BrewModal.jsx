import React from "react"
import {Row, Modal, Button} from 'react-bootstrap';
import Tool from './Tool.jsx';
import {copyImage} from '../Components/Tools.jsx';
import Spoon from '../images/spoon.png';
import Timer from 'react-compound-timer';


class BrewModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            started: false,
            failed: false,
            isActionComplete: true,

        };
    }
    
    render() {
        const { isActionComplete, failed, started } = this.state;
        const { show, onComplete, timer, source } = this.props;

        const machineClass = isActionComplete ? "shaking" : "";

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
                    if (started) {
                        start();
                    }
                    return (
                    <Modal
                        onShow={() => {
                            setTime(this.props.timer * 1000 + 999);
                            stop();
                            reset();
                        }}
                        show={true}
                        onHide={() => {
                            stop();
                            reset();
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
                                <h4 className="successText" hidden={!isActionComplete}>
                                    You completed the action!
                                </h4>
                            </div>
                      </Modal.Header>
                      <Modal.Body id="brew-body" style={{height: '500px', width: '750px'}}>
                            <Tool
                                draggable
                                actionTool
                                boundId="#brew-body"
                                tool={source}
                                onDrag={this.handleDrag}
                            />
                            <img className={machineClass} src={Spoon}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" disabled={!failed} hidden={!failed} onClick={() => {
                                reset();
                                this.resetState()
                            }}>
                                Retry
                            </Button>
                            <Button variant="primary" onClick={() => {
                                pause();
                                reset();
                                this.onSuccess();
                            }} disabled={!isActionComplete}>
                                Continue
                            </Button>
                        </Modal.Footer>
                  </Modal>
                );
                }}
            </Timer>        
        );
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
}

export default BrewModal;
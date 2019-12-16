import React from "react"
import {Row, Modal, Button} from 'react-bootstrap';
import Tool from './Tool.jsx';
import {copyImage} from '../Components/Tools.jsx';

class PumpModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            pumps: 0,
            started: false,
            finished: false,
            earlyRelease: false,
            earlyPump: false,
            sourceCopy: this.props.source.clone(),
            targetCopy: this.props.target.clone(),
            animation: null,
        };
        
        this.resetState = this.resetState.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onPump = this.onPump.bind(this);
        this.onPumpEnd = this.onPumpEnd.bind(this);
    }
    
    render() {
        const {pumps, started, finished, earlyRelease, earlyPump, sourceCopy, targetCopy, animation} = this.state;
        const {show, pumpsNeeded, onComplete} = this.props;

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
                        <div className={ finished && pumps === pumpsNeeded ? 'displayNone' : ''}>
                            {pumps} Successful {pumps === 1? "Pump" : "Pumps"}
                        </div>
                        <h4 className="failedText" hidden={(!started && !finished) || !this.hasErred()}>
                            You {earlyRelease? "released too soon" : earlyPump? "pumped too soon" : "pumped an incorrect amount"}! Try again. 
                        </h4>
                        <h4 className="successText" hidden={!finished || this.hasErred()}>
                            You completed the action!
                        </h4>
                    </div>
                </Modal.Header>
                <Modal.Body id="blend-body" style={{height: '500px', width: '750px'}}>
                    <Row style={{display: "flex", alignItems: "flex-end"}}>
                        <Tool
                            tool={targetCopy}
                        />
                        <Tool
                            tool={sourceCopy}
                        />
                    </Row>
                    <Button
                        variant="primary"
                        disabled={finished || earlyRelease || earlyPump}
                        onMouseDown={this.onPump}
                        onMouseUp={() => {
                            window.cancelAnimationFrame(animation);
                            this.onPumpEnd();
                        }}
                    >
                        Pump
                    </Button>
                    <Button
                        variant="primary"
                        disabled={finished || earlyRelease || earlyPump}
                        onClick={this.onFinish}
                    >
                        Finish
                    </Button>               
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning"
                        disabled={(!started && !finished) || !this.hasErred()}
                        hidden={(!started && !finished) || !this.hasErred()} 
                        onClick={this.resetState}
                    >
                        Retry
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!started || !finished || this.hasErred()}
                        onClick={() => {
                            this.resetState();
                            onComplete();
                        }}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    hasErred() {
        const {pumps, finished, earlyRelease, earlyPump} = this.state;
        const {pumpsNeeded} = this.props
        return (finished && pumps != pumpsNeeded) || earlyRelease || earlyPump;
    }

    resetState() {
        const {source, target} = this.props;
        this.setState({
            pumps: 0,
            started: false,
            finished: false,
            earlyRelease: false,
            earlyPump: false,
            sourceCopy: source.clone(),
            targetCopy: target.clone(),
            animation: null
        });
    }

    handleEarlyRelease() {
        let {animation} = this.state;
        window.cancelAnimationFrame(animation);
        this.setState({
            earlyRelease: true,
            animation: null
        });
    }

    handleEarlyPump() {
        let {animation} = this.state;
        window.cancelAnimationFrame(animation);
        this.setState({
            earlyPump: true,
            animation: null
        });
    }

    onFinish() {
        this.setState({
            finished: true
        });
    }
    
    onHide = () => {
        this.resetState();
        this.props.onComplete();
    }

    onPump() {
        let {pumps, started, sourceCopy, targetCopy, animation} = this.state
        let {compressed, isMaxed, isReleasing}  = sourceCopy.image.animation;

        if (!started) {
            this.setState({
                started: true
            });
        }

        if (isReleasing) {
            this.handleEarlyPump();
            return;
        }

        this.setState({
            animation: window.requestAnimationFrame(this.onPump)
        });

        if (compressed < 1) {
            sourceCopy.image.animation.compressed += .05;
            targetCopy.image.properties.Fill += .0025;
            this.setState({
                sourceCopy,
                targetCopy
            })
        } else if (compressed >= 1 && !isMaxed) {
            sourceCopy.image.animation.compressed = 1;
            sourceCopy.image.animation.isMaxed = true;
            this.setState({
                pumps: pumps + 1,
                sourceCopy
            });
        }

        sourceCopy.image.animation.isMined = false;
        this.setState({
            sourceCopy
        })
    }

    onPumpEnd() {
        let {sourceCopy} = this.state
        let {compressed, isMaxed}  = sourceCopy.image.animation;

        sourceCopy.image.animation.isReleasing = true;
        this.setState({
            sourceCopy
        });

        if (!isMaxed && compressed != 0) {
            this.handleEarlyRelease();
            return;
        }

        if (compressed === 0) {
            window.cancelAnimationFrame(this.state.animation);
        }
        this.setState({
            animation: !compressed? null : window.requestAnimationFrame(this.onPumpEnd)
        });
        
        if (compressed > 0) {
            sourceCopy.image.animation.compressed -= .25;
        } else {
            sourceCopy.image.animation.compressed = 0;
            sourceCopy.image.animation.isMaxed = false;
            sourceCopy.image.animation.isMined = true;
            sourceCopy.image.animation.isReleasing = false;
        }
        this.setState({
            sourceCopy
        });
    }
}

export default PumpModal;
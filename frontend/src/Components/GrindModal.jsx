import React from "react"
import {Modal, Button} from 'react-bootstrap';
import Tool from './Tool.jsx';

class GrindModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            started: false,
			failed: false,
            completed: false,
            sourceCopy: this.props.source.clone(),
            animation: null,
        };
        
        this.resetState = this.resetState.bind(this);
        this.onGrind = this.onGrind.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onGrindEnd = this.onGrindEnd.bind(this);
    }
    
    render() {
        const {started, failed, completed} = this.state;
        const {show, source} = this.props;
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
                    <div className={completed && !failed ? 'displayNone' : ''}>
                        Grind the coffee beans!
                    </div>
                    <h4 className="failedText" hidden={!failed}>
                        You have failed! Try again!
                    </h4>
                    <h4 className="successText" hidden={!completed || failed}>
                        You completed the action!
                    </h4>
                </div>
            </Modal.Header>
            <Modal.Body id="blend-body" style={{height: '500px', width: '750px'}}>
                <Tool
                    tool={source}
                />
                <Button variant="primary" disabled={completed || failed} onMouseDown={this.onGrind}
                    onMouseUp={() => {
                        stop();
                        this.onBlendEnd()
                    }}
                >
                    Blend
                </Button>               
            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="warning" disabled={!failed} hidden={!failed} onClick={() => {
                                    reset();
                                    this.resetState();
                                    }}>
                                    Retry
                                </Button>
                                <Button variant="primary" disabled={!completed || failed} onClick={() => {
                                    reset();
                                    this.resetState();
                                    this.props.onComplete();
                                    }}>
                                    Continue
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    );
                }}
            </Timer>
        );
    }

    resetState() {
        this.setState({
            started: false,
            completed: false,
            failed: false,
            time: null
        });
    }

    onStop() {
        if (this.state.time >= this.props.time - 1 && this.state.time <= this.props.time + 1) {
            console.log(this.state.time, this.props.time)
            this.setState({
                completed: true
            })
        } else {
            this.setState({
                failed: true
            })
        }
    }
    
    onHide = () => {
        this.resetState();
        this.props.onComplete();
    }

    onBlend() {
        const {target} = this.props
        const {ramp, rock, increasing, reset}  = target.image.animation

        target.image.animation.shake = true;
        target.image.animation.reset = !reset;

        const animation = window.requestAnimationFrame(this.onBlend);
        this.setState({animation});

        if (ramp < 1) {
            target.image.animation.ramp += .10
        } else {
            if (increasing) {
                target.image.animation.rock += .1;
                target.image.animation.increasing = !(target.image.animation.rock >= 1) 
            }
            else {
                target.image.animation.rock -= .1;
                target.image.animation.increasing = (target.image.animation.rock <= 0)
            }
        }
    }

    onBlendEnd() {
        const {target} = this.props
        const {ramp, rock, increasing, shake}  = target.image.animation

        target.image.animation.shake = false;
        target.image.animation.resetX = 0;
        target.image.animation.resetY = 0;

        if (target.image.animation.ramp === 0 && target.image.animation.rock === .5) {
            window.cancelAnimationFrame(this.state.animation);
        } else {
            const animation = window.requestAnimationFrame(this.onBlendEnd);
            this.setState({animation});
        }
        
        if (target.image.animation.ramp > 0) {
            target.image.animation.ramp -= .2;
            if (target.image.animation.ramp < .1 && target.image.animation.ramp > -.1) {
                target.image.animation.ramp = 0;
            }
        } else {
            target.image.animation.ramp = 0;
        }
        if (target.image.animation.rock != .5) {
            if (rock > .6) {target.image.animation.rock -= .1}
            else  if (rock < .4) {target.image.animation.rock += .1}
            else {target.image.animation.rock = .5}
        }
    }
}

export default BlendModal;
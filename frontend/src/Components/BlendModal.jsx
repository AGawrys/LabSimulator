import React from "react"
import {Modal} from 'react-bootstrap';
import Timer from "react-compound-timer";
import Tool from './Tool.jsx';

class BlendModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            started: false,
			failed: false,
            completed: false,
            animation: null
        };
        
        this.onBlend = this.onBlend.bind(this);
        this.onBlendEnd = this.onBlendEnd.bind(this);
    }
    
    render() {
        const {started, ended, failed, completed} = this.state;
        const {show, source, target} = this.props;
        return (
            <Timer
				startImmediately={false}
				checkpoints={[{
					time: (this.props.time - 1) * 1000 ,
					callback: () => this.handleCompleted()
				}, {
                    time: (this.props.time + 1) * 1000,
                    callback: () => this.handleFailed()
                }]}
			>
                {({ start, resume, pause, stop, reset, getTimerState, getTime, setTime }) =>  {
                    if (started) {
                        start();
                    }
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
                                        <Timer.Seconds /> seconds
                                    </div>
                                    <h4 className="failedText" hidden={!failed}>
                                        You have failed! Try again!
                                    </h4>
                                    <h4 className="successText" hidden={completed && !failed}>
                                        You completed the action!
                                    </h4>
                                </div>
                            </Modal.Header>
                            <Modal.Body id="blend-body" style={{height: '500px', width: '750px'}}>
                                <Tool
                                    tool={target}
                                />
                                <button
                                    onMouseDown={this.onBlend}
                                    onMouseUp={this.onBlendEnd}>
                                    Blend!
                                </button>                
                            </Modal.Body>
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
        });
    }

    handleCompleted() {
        this.setState({
            completed: true
        });
    }

    handleFailed() {
        this.setState({
            failed: true
        });
    }
    
    onHide = () => {
        this.resetState();
        this.props.onComplete();
    }

    onBlend() {
        const {target} = this.props
        const {ramp, rock, increasing, reset}  = target.image.animation

        const animation = window.requestAnimationFrame(this.onBlend);
        this.setState({animation});

        target.image.animation.shake = true;
        target.image.animation.reset = !reset;
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
            console.log(target.image.animation.ramp)
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
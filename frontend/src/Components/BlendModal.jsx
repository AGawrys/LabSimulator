import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Timer from 'react-compound-timer';
import Tool from './Tool.jsx';

class BlendModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			started: false,
			failed: false,
            completed: false,
            animation: null,
            time: null,
        };
        
        this.resetState = this.resetState.bind(this);
        this.onBlend = this.onBlend.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onBlendEnd = this.onBlendEnd.bind(this);
    }
    
    render() {
        const {started, ended, failed, completed} = this.state;
        const {show, source, target, onHide} = this.props;
        return (
            <Timer
                startImmediately={false}
                onStop={this.onStop}
				checkpoints={[{
					time: ((this.props.time - 1) * 1000),
					callback: () => this.setState({time: this.props.time - 1})
				}, {
                    time: (this.props.time + 2)  * 1000,
                    callback: () => this.setState({time: this.props.time + 2})
                }]}
			>
                {({ start, resume, pause, stop, reset, getTimerState, getTime, setTime }) =>  {
                    if (started) {
                        start();
                    }
                    return (
                        <Modal
                            show={show}
                            onHide={() => {
                                stop();
                                reset();
                                this.onHide();
                            }}
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
                                    <h4 className="successText" hidden={!completed || failed}>
                                        You completed the action!
                                    </h4>
                                </div>
                            </Modal.Header>
                            <Modal.Body id="blend-body" style={{height: '500px', width: '750px'}}>
                                <Tool
                                    tool={target}
                                />
                                <Button variant="primary" disabled={completed || failed} onMouseDown={() => {
                                    start();
                                    this.onBlend()
                                    }}
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
                                    this.onComplete();
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

	onHide = () => {
		this.resetState();
		this.props.onComplete();
	};

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
        this.props.onHide();
    }

    onComplete = () => {
        this.resetState();
        this.onHide();
        this.props.onComplete();
    }

		target.image.animation.shake = true;
		target.image.animation.reset = !reset;

		const animation = window.requestAnimationFrame(this.onBlend);
		this.setState({ animation });

		if (ramp < 1) {
			target.image.animation.ramp += 0.1;
		} else {
			if (increasing) {
				target.image.animation.rock += 0.1;
				target.image.animation.increasing = !(target.image.animation.rock >= 1);
			} else {
				target.image.animation.rock -= 0.1;
				target.image.animation.increasing = target.image.animation.rock <= 0;
			}
		}
	}

	onBlendEnd() {
		const { target } = this.props;
		const { ramp, rock, increasing, shake } = target.image.animation;

		target.image.animation.shake = false;
		target.image.animation.resetX = 0;
		target.image.animation.resetY = 0;

		if (target.image.animation.ramp === 0 && target.image.animation.rock === 0.5) {
			window.cancelAnimationFrame(this.state.animation);
		} else {
			const animation = window.requestAnimationFrame(this.onBlendEnd);
			this.setState({ animation });
		}

		if (target.image.animation.ramp > 0) {
			target.image.animation.ramp -= 0.2;
			if (target.image.animation.ramp < 0.1 && target.image.animation.ramp > -0.1) {
				target.image.animation.ramp = 0;
			}
		} else {
			target.image.animation.ramp = 0;
		}
		if (target.image.animation.rock != 0.5) {
			if (rock > 0.6) {
				target.image.animation.rock -= 0.1;
			} else if (rock < 0.4) {
				target.image.animation.rock += 0.1;
			} else {
				target.image.animation.rock = 0.5;
			}
		}
	}
}

export default BlendModal;

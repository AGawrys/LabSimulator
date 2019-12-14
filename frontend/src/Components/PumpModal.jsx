import React from "react"
import {Modal, Button} from 'react-bootstrap';
import Tool from './Tool.jsx';

class PumpModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            pumps: 0,
            finished: false,
            animation: null,
        };
        
        this.resetState = this.resetState.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onPump = this.onPump.bind(this);
        this.onPumpEnd = this.onPumpEnd.bind(this);
    }
    
    render() {
        const {pumps, finished, animation} = this.state;
        const {show, source, target, pumpsNeeded, onComplete} = this.props;

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
                        <div className={finished && pumps === pumpsNeeded? 'displayNone' : ''}>
                            {pumps} Successful {pumps === 1? "Pump" : "Pumps"}
                        </div>
                        <h4 className="failedText" hidden={!finished || pumps === pumpsNeeded}>
                            You have failed! Try again!
                        </h4>
                        <h4 className="successText" hidden={!finished || pumps != pumpsNeeded}>
                            You completed the action!
                        </h4>
                    </div>
                </Modal.Header>
                <Modal.Body id="blend-body" style={{height: '500px', width: '750px'}}>
                    <Tool
                        tool={source}
                    />
                    <Tool
                        tool={target}
                    />
                    <Button
                        variant="primary"
                        disabled={finished}
                        onMouseDown={this.onPump}
                        onMouseUp={this.onPumpEnd}
                    >
                        Pump
                    </Button>
                    <Button
                        variant="primary"
                        disabled={finished}
                        onClick={this.onFinish}
                    >
                        Finish
                    </Button>               
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning"
                        disabled={!finished || pumps === pumpsNeeded}
                        hidden={!finished || pumps === pumpsNeeded} 
                        onClick={this.resetState}
                    >
                        Retry
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!finished || pumps != pumpsNeeded}
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

    resetState() {
        this.setState({
            pumps: 0,
            finished: false
        });
    }

    onFinish() {
        this.setState({
            finish: true
        });
    }
    
    onHide = () => {
        this.resetState();
        this.props.onComplete();
    }

    onPump() {
        return
        /* const {target} = this.props
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
        } */
    }

    onPumpEnd() {
        return
        /* const {target} = this.props
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
        } */
    }
}

export default PumpModal;
import React from 'react';
import '../Styles/popupStyle.css';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Timer from 'react-compound-timer';
import Tool from './Tool.jsx';

class ShakeModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			position: {
				x: 0,
				y: 0
			},
			failed: false,
			completed: false,
			started: false
		};
	}

	handleDrag = (e, ui) => {
		if (this.state.failed) {
			return;
		}

		const { progress, position } = this.state;
		const { x, y } = position;
		const newProgress = progress + Math.abs(ui.deltaX) + Math.abs(ui.deltaY);
		this.setState({
			progress: newProgress,
			position: {
				x: x + ui.deltaX,
				y: y + ui.deltaY
			},
			started: true
		});
	};

	render() {
		const { progress, failed, completed, started } = this.state;
		const { progressNeeded, show, onComplete, tool } = this.props;

		let percentComplete = (progress / progressNeeded).toFixed(0);
		percentComplete = percentComplete < 100 ? percentComplete : 100;
		const modalBody =
			percentComplete === 100 ? <SuccessBody /> : <ShakeBody handleDrag={this.handleDrag} tool={tool} />;
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
				{({ start, resume, pause, stop, reset, getTimerState, getTime, setTime }) => {
					if (this.state.started) {
						start();
					} else {
						setTime(this.props.timer * 1000 + 999);
						stop();
						reset();
					}
					return (
						<Modal
							show={show}
							onHide={this.resetProgress}
							size="lg"
							aria-labelledby="contained-modal-title-vcenter"
							centered
						>
							<Modal.Header closeButton>
								<div style={{ width: 400 }}>
									<ProgressBar
										variant="success"
										animated
										now={percentComplete}
										label={`${percentComplete}%`}
										max={100}
									/>
									<div className={percentComplete === 100 ? 'displayNone' : ''}>
										<Timer.Seconds /> seconds
									</div>
									<h4 className="failedText" hidden={!failed}>
										You have failed! Try again!
									</h4>
								</div>
							</Modal.Header>
							<Modal.Body id="shake-body" style={{ height: '500px', width: '750px' }}>
								{modalBody}
							</Modal.Body>
							<Modal.Footer>
								<Button
									variant="warning"
									disabled={!failed}
									hidden={!failed}
									onClick={() => {
										reset();
										start();
										this.resetState();
									}}
								>
									Retry
								</Button>
								<Button variant="primary" onClick={this.resetProgress} disabled={percentComplete < 100}>
									Continue
								</Button>
							</Modal.Footer>
						</Modal>
					);
				}}
			</Timer>
		);
	}

	resetState = () => {
		this.setState({
			progress: 0,
			position: {
				x: 0,
				y: 0
			},
			failed: false,
			completed: false,
			started: false
		});
	};

	handleStateChange = () => {
		if (this.state.progress / this.props.progressNeeded === 1) {
			return;
		}
		this.setState({ failed: true }); //you get the value here when state changes in B(Child) component
	};

	resetProgress = () => {
		this.resetState();
		this.props.onComplete();
	};
}

function ShakeBody(props) {
	const { tool, handleDrag } = props;
	return <Tool draggable actionTool tool={tool} onDrag={handleDrag} />;
}

function SuccessBody() {
	return <h2> Action successfully completed! </h2>;
}

export default ShakeModal;

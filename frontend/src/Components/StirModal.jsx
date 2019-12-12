import React from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import ArrowKeysReact from 'arrow-keys-react';
import SuccessBody from './ActionCompletedBody.jsx';
import Spoon from '../images/spoon.png';
import Timer from 'react-compound-timer';
import '../Styles/editor.css';

class StirModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			currentKey: 'UP',
			angle: 0,
			largerCircleStyle: {},
			smallerCircleStyle: {},
			failed: false,
			completed: false,
			started: false
		};
		ArrowKeysReact.config({
			left: () => this.handleArrowKeyPress('LEFT'),
			right: () => this.handleArrowKeyPress('RIGHT'),
			up: () => this.handleArrowKeyPress('UP'),
			down: () => this.handleArrowKeyPress('DOWN')
		});
	}

	render() {
		const { progress, currentKey, smallerCircleStyle, largerCircleStyle, failed, completed } = this.state;
		const { progressNeeded, show, onComplete, timer, target } = this.props;
		let percentComplete = (progress / progressNeeded * 100).toFixed(2);
		percentComplete = percentComplete < 100 ? percentComplete : 100;
		const modalBody =
			percentComplete === 100 ? (
				<SuccessBody />
			) : (
				<StirBody
					largerCircleStyle={largerCircleStyle}
					currentKey={currentKey}
					smallerCircleStyle={smallerCircleStyle}
					target={target}
				/>
			);
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
					}
					return (
						<Modal
							{...ArrowKeysReact.events}
							onShow={() => {
							  setTime(this.props.timer * 1000 + 999);
							  stop();
							  reset();
							}}
							show={show}
							onHide={this.resetProgress}
							size="lg"
							tabIndex={1}
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
							<Modal.Body>{modalBody}</Modal.Body>
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
								<Button variant="primary" onClick={() => {
									pause();
									reset();
									this.onSuccess();
								}} disabled={percentComplete < 100}>
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
			progress: 0,
			currentKey: 'UP',
			angle: 0,
			largerCircleStyle: {},
			smallerCircleStyle: {},
			failed: false,
			completed: false,
			started: false
		});
	};

	resetProgress = () => {
		this.resetState();
		this.props.onHide();
	};

	handleStateChange = () => {
		if (this.state.progress / this.props.progressNeeded === 1) {
			return;
		}
		this.setState({ failed: true }); //you get the value here when state changes in B(Child) component
	};

	handleArrowKeyPress = (direction) => {
		if (this.state.failed) {
			return;
		}
		const { currentKey, progress } = this.state;
		if (KEY_ORDER[currentKey] !== direction) {
			return;
		}
		const angle = this.state.angle + 90;
		const largerCircleStyle = { transform: 'rotate(' + angle + 'deg)', backgroundColor: this.props.target.color };
		const smallerCircleStyle = { transform: 'rotate(-' + angle + 'deg)' };

		this.setState({
			angle: angle,
			largerCircleStyle: largerCircleStyle,
			smallerCircleStyle: smallerCircleStyle,
			currentKey: direction,
			progress: direction === 'RIGHT' ? progress + 1 : progress,
			started: true
		});
	};
}

const KEY_ORDER = {
	RIGHT: 'DOWN',
	DOWN: 'LEFT',
	LEFT: 'UP',
	UP: 'RIGHT'
};

function StirBody(props) {
	console.log(Object.entries(props.largerCircleStyle).length === 0 && props.largerCircleStyle.constructor === Object);
	return (
		<React.Fragment>
			<div className="centerCircle">
				<div
					id="largerCircle"
					style={
						Object.entries(props.largerCircleStyle).length === 0 &&
						props.largerCircleStyle.constructor === Object ? (
							{ backgroundColor: [ props.target.color ] }
						) : (
							props.largerCircleStyle
						)
					}
				>
					<div id="smallerCircle" style={props.smallerCircleStyle}>
						<img src={Spoon} />
					</div>
				</div>
			</div>

			<p> NEXT Key: {KEY_ORDER[props.currentKey]}</p>
		</React.Fragment>
	);
}

export default StirModal;

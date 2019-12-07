import React from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import ArrowKeysReact from 'arrow-keys-react';
import SuccessBody from './ActionCompletedBody.jsx';
import Spoon from '../images/spoon.png';

class StirModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			currentKey: 'UP',
			angle: 0,
			largerCircleStyle: {},
			smallerCircleStyle: {}
		};
		ArrowKeysReact.config({
			left: () => this.handleArrowKeyPress('LEFT'),
			right: () => this.handleArrowKeyPress('RIGHT'),
			up: () => this.handleArrowKeyPress('UP'),
			down: () => this.handleArrowKeyPress('DOWN')
		});
	}

	render() {
		const { progress, currentKey, smallerCircleStyle, largerCircleStyle } = this.state;
		const { progressNeeded, show, onComplete } = this.props;
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
				/>
			);

		return (
			<Modal
				{...ArrowKeysReact.events}
				show={true}
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
					</div>
				</Modal.Header>
				<Modal.Body>{modalBody}</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={onComplete} disabled={percentComplete < 100}>
						Continue
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	handleArrowKeyPress = (direction) => {
		const { currentKey, progress } = this.state;
		if (KEY_ORDER[currentKey] !== direction) {
			return;
		}
		const angle = this.state.angle + 90;
		const largerCircleStyle = { transform: 'rotate(' + angle + 'deg)' };
		const smallerCircleStyle = { transform: 'rotate(-' + angle + 'deg)' };

		this.setState({
			angle: angle,
			largerCircleStyle: largerCircleStyle,
			smallerCircleStyle: smallerCircleStyle,
			currentKey: direction,
			progress: direction === 'RIGHT' ? progress + 1 : progress
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
	return (
		<React.Fragment>
			<div className="centerCircle">
				<div id="largerCircle" style={props.largerCircleStyle}>
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

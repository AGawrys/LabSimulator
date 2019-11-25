import React from 'react';  
import {Button, Modal, ProgressBar } from 'react-bootstrap';
import ArrowKeysReact from 'arrow-keys-react';
import SuccessBody from './ActionCompletedBody.jsx';

class PourModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			currentKey: "UP",
		};
		ArrowKeysReact.config({
			left: () => this.handleArrowKeyPress("LEFT"),
			right: () => this.handleArrowKeyPress("RIGHT"),
			up: () => this.handleArrowKeyPress("UP"),
			down: () => this.handleArrowKeyPress("DOWN"),
		});
	}

	render() {
		const {progress, currentKey} = this.state;
		const {progressNeeded, show, onComplete} = this.props;
		let percentComplete = ((progress / progressNeeded) * 100).toFixed(2);
    	percentComplete = percentComplete < 100 ? percentComplete : 100;
    	const modalBody = percentComplete === 100 ? <SuccessBody/> : <PourBody currentKey={currentKey}/>;

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
    		            max={100}/>
    		        </div>
    		    </Modal.Header>
    		    <Modal.Body>
    		      {modalBody}
    		    </Modal.Body>
    		    <Modal.Footer>
    		      <Button variant="primary" onClick={onComplete} disabled={percentComplete < 100}>
    		        Continue
    		      </Button>
    		    </Modal.Footer>
    		</Modal>
		);
	}

	handleArrowKeyPress = (direction) => {
		const {currentKey, progress} = this.state;
		if (KEY_ORDER[currentKey] !== direction) {
			return;
		}
		this.setState({
			currentKey: direction,
			progress: direction === "RIGHT" ? progress + 1 : progress,
		});
	}
}

const KEY_ORDER = {
	RIGHT: "DOWN",
	DOWN: "LEFT",
	LEFT: "UP",
	UP: "RIGHT",
};

function PourBody(props) {
	return <p> NEXT Key: {KEY_ORDER[props.currentKey]}</p>;
}

export default PourModal;
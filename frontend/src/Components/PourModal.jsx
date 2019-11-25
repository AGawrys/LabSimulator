import React from 'react';  
import {Button, Modal, ProgressBar } from 'react-bootstrap';
import SuccessBody from './ActionCompletedBody.jsx';


class StirModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
		}
	}

	render() {
		const {progress, currentKey} = this.state;
		const {progressNeeded, show, onComplete} = this.props;
		let percentComplete = ((progress / progressNeeded) * 100).toFixed(2);
    	percentComplete = percentComplete < 100 ? percentComplete : 100;
    	const modalBody = percentComplete === 100 ? <SuccessBody/> : 
    		<PourBody currentKey={currentKey} onPourStart={this.onPourStart} onPourEnd={this.onPourEnd}/>;

    	return (
    		<Modal
    		    show={true}
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

	onPourStart = () => {
		
	}

	onPourEnd = () => {
		console.log("Pour has Ended!");
	}
}

function PourBody(props) {
	const {onPourStart, onPourEnd} = props;
	return (
		<div> 
			<div className="cup"> </div>
			<Button variant="success" onMouseDown={onPourStart} onMouseUp={onPourEnd}> Pour! </Button>
		</div>
	);	
}

export default StirModal;
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class StudentDirectionModal extends React.Component {
	render() {
		return (
			<Modal show={this.props.show}>
				<Modal.Header>
					<h3>Directions for Student</h3>
				</Modal.Header>
				<Modal.Body>
					<h6>1. Right click source tool to select appropriate.</h6>
					<h6>2. Drag source tool to target tool to perform action.</h6>
					<h6>Note: Some actions may only need 1 tool.</h6>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={this.props.closeDirection}>
						I have read and understood the directions.
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default StudentDirectionModal;

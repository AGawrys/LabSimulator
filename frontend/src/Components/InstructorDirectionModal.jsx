import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class InstructorDirectionModal extends React.Component {
	render() {
		return (
			<Modal show={this.props.show}>
				<Modal.Header>
					<h3>Need Help?</h3>
				</Modal.Header>
				<Modal.Body>
                <h6>1. Drag tools from the catalog to canvas.</h6>
                <h6>2. Choose action from the Action Manager.</h6>
                <h6>3. Fill out required fields.</h6>
                <h6>4. Click Simulate to see your action.</h6>
                <br />
                <h6>Right click tools to edit properties.</h6>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={this.props.closeDirection}>
                    Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default InstructorDirectionModal;

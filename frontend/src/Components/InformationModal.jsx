import React from 'react';  
import { Button, Form, Modal } from 'react-bootstrap';

function InformationModal(props) {
    const {title, message, onHide} = props;

    return (  
        <Modal
            {...props} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p> {message} </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}> Close </Button>
            </Modal.Footer>
        </Modal>

    ); 

}
 
export default InformationModal;

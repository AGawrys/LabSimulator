import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Form, Modal } from 'react-bootstrap';

class ConfirmationModal extends React.Component {  



  render() { 
        const {title, message, onHide, onDelete} = this.props; 
        const deleteAndHide = () => {
            onDelete();
            onHide();
        };
        return (  
            <Modal
                {...this.props} 
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
                    <Button variant="secondary" onClick={onHide}> Cancel </Button>
                    <Button variant="danger" onClick={deleteAndHide}> Delete </Button>
                </Modal.Footer>
            </Modal>

        );  
    }  
}  
export default ConfirmationModal;

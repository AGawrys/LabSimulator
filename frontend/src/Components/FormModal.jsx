import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Form, Modal } from 'react-bootstrap';

class FormModal extends React.Component {  
  render() {  
    return (  
        <Modal
            {...this.props} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.props.submitAction}>
                {this.props.children}
            </Form>
        </Modal>

    );  
}  
}  
export default FormModal;

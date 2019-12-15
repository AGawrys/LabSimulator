import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Form, Modal } from 'react-bootstrap';
import Search from 'react-search';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from 'axios';


class FormModal extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
        };
    }

    render() { 
        const {items, onHide, show} = this.props; 
        const {selectedItems} = this.state;
        return (  
            <Modal
                show={show}
                onHide={onHide} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <Typeahead
                            id="add-search"
                            options={items}
                            placeholder='Search...'
                            multiple={true}
                            onChange={(selectedItems) => this.setState({selectedItems})}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" disabled={selectedItems.length == 0}>
                            Add
                        </Button>
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );  
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {actionRoute, items, param, onSuccessfulAdd, onHide} = this.props;
        const keys = this.state.selectedItems.map((item) => item.data);
        const body = {
            ids: keys,
            param: param,
        };
        axios.post(actionRoute, body).then(
            (response) => {
                onSuccessfulAdd();
                onHide();
            },
            (error) => console.log(error),
        );
    }



}  
export default FormModal;

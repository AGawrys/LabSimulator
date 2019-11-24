import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Form, Modal } from 'react-bootstrap';
import Search from 'react-search';
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
                        <Search items={items}
                                placeholder='Search...'
                                NotFoundPlaceholder='No items found!'
                                multiple={true}
                                onItemsChanged={(items) => this.setState({selectedItems:items})}
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
        const selectedIndices = this.state.selectedItems.map((item) => item.id);
        const keys = selectedIndices.map((index) => items[index].key);
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
        )
    }



}  
export default FormModal;

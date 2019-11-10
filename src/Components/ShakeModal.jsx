import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Form, Modal } from 'react-bootstrap';
import Draggable from 'react-draggable';

class ShakeModal extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  };

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;

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
            <Modal.Body>
                <Draggable {...dragHandlers}>
                    <div>I can be dragged anywhere</div>
                </Draggable>
            </Modal.Body>
        </Modal>

    ); 
  }
}

export default ShakeModal;
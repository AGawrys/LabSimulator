import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import Draggable from 'react-draggable';

class ShakeModal extends React.Component {

  state = {
    progress: 0,
    position: {
      x: 0, y: 0
    },
    isComplete: false,
  };


  handleDrag = (e, ui) => {
    const {x, y} = this.state.position;
    const {progress} = this.state;
    this.setState({
      progress: progress + Math.abs(ui.deltaX) + Math.abs(ui.deltaY),
      position: {
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
    const {progress, position} = this.state;
    const {progressNeeded, show} = this.props;

    let percentComplete = (progress / progressNeeded).toFixed(0);
    percentComplete = percentComplete < 100 ? percentComplete : 100;

    return (  
        <Modal
            show={show}
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
              <div style={{height: '500px', width: '750px', padding: '10px'}}>
                <Draggable bounds="parent" onDrag={this.handleDrag} {...dragHandlers}>
                    <div className="box">
                        <div>I can be dragged anywhere</div>
                        <div>x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}</div>
                    </div>
                </Draggable>
              </div>
            </Modal.Body>
        </Modal>

    ); 
  }
}

export default ShakeModal;
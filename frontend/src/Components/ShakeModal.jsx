import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Draggable from 'react-draggable';
import SuccessBody from './ActionCompletedBody.jsx';

class ShakeModal extends React.Component {

  state = {
    progress: 0,
    position: {
      x: 0, y: 0
    },
  };


  handleDrag = (e, ui) => {
    const {progress, position} = this.state;
    const {x, y} = position;
    const newProgress = progress + Math.abs(ui.deltaX) + Math.abs(ui.deltaY);
    this.setState({
      progress: newProgress,
      position: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  render() {
    const {progress, position} = this.state;
    const {progressNeeded, show, onComplete} = this.props;
    let percentComplete = ((progress / progressNeeded) * 100).toFixed(2);
    percentComplete = percentComplete < 100 ? percentComplete : 100;
    const modalBody = percentComplete === 100 ? <SuccessBody/> : <ShakeBody handleDrag={this.handleDrag} position={position}/>;

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
}

function ShakeBody(props) {
  const {handleDrag, position} = props;
  return (
      <div style={{height: '500px', width: '750px', padding: '10px'}}>
        <Draggable bounds="parent" onDrag={handleDrag}>
          <div className="box">
            <p style={{color: "white"}}>I can be dragged anywhere</p>
          </div>
        </Draggable>
      </div>
    );
}

export default ShakeModal;
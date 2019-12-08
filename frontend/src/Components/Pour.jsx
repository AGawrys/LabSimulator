import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Button, Modal, Row } from 'react-bootstrap';
import '../Styles/Pour.css';
import Tool from '../Objects/Tool.js';
import { CATEGORIES, IMAGES } from './Tools.jsx';
import { Tool as ToolComponent } from './Tool.jsx';
import { Draggable } from 'react-drag-and-drop';
import ClickNHold from 'react-click-n-hold'; 
class Pour extends React.Component {
    

    state = {
        fill: 0,
        fillSrc: 1,
        transform:'translate3d(0, 0px, 0) scale(1) rotate(0deg)',
        t:undefined,
        start:100,
        instruction: "Fill halfway",
        goalMin: .45,
        goalMax: .55,
        done: false,
        modalShow: true,
    };

    
    animateCupUp = () => {
        this.setState({ transform : 'translate3d(0, -75px, 0) scale(1) rotate(90deg)' });
    };
    repeat = () => {
        this.pour()
        this.t = setTimeout(this.repeat, this.start)
        this.start = this.start / 2
    }

    onMouseDown = () => {
        this.animateCupUp();
        this.repeat()
    }
    onMouseUp = () => {
        const { fill, goalMax, goalMin } = this.state;
        clearTimeout(this.t)
        this.start = 100
        this.setState({ transform : 'translate3d(0, 0px, 0) scale(1) rotate(0deg)' });
        if(fill <= goalMax && fill >= goalMin){
            this.setState({ done: true });
        }
        else {
            this.setState({ done: false });
        }
    }
	pour = (e) =>{
        const { fill, fillSrc } = this.state;
        if (fill < 1){
            const n = fill + 0.01; 
            const nSrc = fillSrc - 0.01; 
            this.setState({ fill : n });
            this.setState({ fillSrc : nSrc }); 
        }
    } 
    reset = () => { 
        this.setState({ fill : 0 });
        this.setState({ fillSrc : 1 }); 
	} 

    closeAndFinish = () => { 
         this.setState({modalShow : false });
    }
    
    render() {
        const { instruction, done, modalShow } = this.state;
        const categories = Object.keys(CATEGORIES);
        const tools = CATEGORIES["Cups"];
        const image = IMAGES["TaperedCup"];
        image.properties.Fill = this.state.fill;
        const mytool = (
            <ToolComponent tool={new Tool("TaperedCup",  image, undefined, 75, 75, undefined)} />
        );

        let imageSrc = {};
		imageSrc.draw = IMAGES["TaperedCup"].draw;
		imageSrc.properties = {};
        imageSrc.properties.Fill = this.state.fillSrc;
        const srctool = (
            <ToolComponent tool={new Tool("TaperedCup",  imageSrc, undefined, 75, 75, undefined)} />
        );
    return (
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div style={style2}>

            <h2>{instruction}</h2>
        <Spring
            from={{
                opacity: 1,
                marginTop: 0,
                transform:
                    'translate3d(0, 0px, 0) scale(2) rotate(0deg)',
            }}
            to={{
                opacity: 1,
                marginTop: 0,
                transform:
                this.state.transform,
            }}
        >
            {props => (
                //pass in a tool after clicking pour
                <div style={{ alignSelf: "center", justifyContent: "center"}}>
                    <Row>
                    <div style={props}>
                    {srctool}
                    </div>
                    {mytool}
                    </Row>
                </div>
            )

            }
        </Spring>
        {/* <Spring
            from={{ x: 100 }}
            to={{ x: 0 }}>
            {props => (
                 <svg id="Guide" strokeDashoffset={props.x}  viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m92.135 502h242.348a26.029 26.029 0 0 0 26-26v-21.986l73.6-65.8a108.767 108.767 0 0 0 -73.6-189.849v-52.477a6 6 0 0 0 -6-6h-282.348a6 6 0 0 0 -6 6v330.112a26.029 26.029 0 0 0 26 26zm317.818-278.685a96.773 96.773 0 0 1 16.128 155.956l-65.6 58.648v-227.551a96.686 96.686 0 0 1 49.472 12.947zm-331.818-71.427h270.348v324.112a14.016 14.016 0 0 1 -14 14h-242.348a14.017 14.017 0 0 1 -14-14z"/><path d="m115.727 351.073a6 6 0 0 0 6-6v-154.921a6 6 0 0 0 -12 0v154.921a6 6 0 0 0 6 6z"/><path d="m115.727 426.944a6 6 0 0 0 6-6v-37.717a6 6 0 0 0 -12 0v37.717a6 6 0 0 0 6 6z"/><path d="m129.817 117.815a6 6 0 0 0 6-6v-39.337a6 6 0 1 0 -12 0v39.337a6 6 0 0 0 6 6z"/><path d="m191.6 117.815a6 6 0 0 0 6-6v-95.815a6 6 0 0 0 -12 0v95.815a6 6 0 0 0 6 6z"/><path d="m242.778 117.815a6 6 0 0 0 6-6v-31.276a6 6 0 0 0 -12 0v31.276a6 6 0 0 0 6 6z"/><path d="m296.8 117.815a6 6 0 0 0 6-6v-75.348a6 6 0 1 0 -12 0v75.348a6 6 0 0 0 6 6z"/></svg>
              
            )}
        </Spring> */}

        </div>
        
            <Button style={{ backgroundColor: 'black', alignSelf: "center", width: "25vh" }} block bsSize="large" onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown}>
                POUR
            </Button>
            <Button style={{ backgroundColor: 'black', alignSelf: "center", width: "25vh" }} block bsSize="large" onClick={this.reset}>
                RESET
            </Button>
            {done ? (<Button style={{ backgroundColor: 'black', alignSelf: "center", width: "25vh" }} block bsSize="large" onClick={this.closeAndFinish}>
                DONE
            </Button>) : null }
        </Modal>
    )
    }
}

const style1 = {
    background: 'steelblue',
    color: 'white'
}

const style2 = {
    height: '30vh',
    width:'30vh',
    paddingLeft: '100px',
    paddingTop: '100px',
    justifyContent: "center"
}

export default Pour;
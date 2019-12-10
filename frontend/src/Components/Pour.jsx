import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import '../Styles/Pour.css';
import Tool from '../Objects/Tool.js';
import { CATEGORIES, IMAGES } from './Tools.jsx';
import { Tool as ToolComponent } from './Tool.jsx';
import { Draggable } from 'react-drag-and-drop';
import ClickNHold from 'react-click-n-hold'; 
import { isArrayEqual } from '../LilacArray';
class Pour extends React.Component {
    constructor(props) {
    super(props);
    const { source, target, goal, instructor, show } = this.props;
    this.state = {
        fill: target.image.properties.Fill,
        fillSrc: source.image.properties.Fill,
        defaultFill: target.image.properties.Fill,
        defaultFillSrc: source.image.properties.Fill,
        color: target.image.properties.Color,
        colorSrc: source.image.properties.Color,
        transform:'translate3d(0, 0px, 0) scale(1) rotate(0deg)',
        t:undefined,
        start:100,
        instruction: 'Add '+ goal + '% to the cup' ,
        goal,
        goalMin: (goal/100) - 0.05 + (target.image.properties.Fill),
        goalMax: (goal/100) + 0.05 + (target.image.properties.Fill),
        done: false,
        show,
        instructor, //if this is simulate or not
    };
    }
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
        if (fillSrc > 0){
            const n = fill + 0.01; 
            const nSrc = fillSrc - 0.01; 
            this.setState({ fill : n });
            this.setState({ fillSrc : nSrc }); 
        }
    } 
    reset = () => { 
        const { defaultFill, defaultFillSrc } = this.state;
        console.log("default fill: " + defaultFill);
        console.log("default fill Source : " + defaultFillSrc);
        const defaultTarget = defaultFill;
        const defaultSource = defaultFillSrc;
        this.setState({ fill : defaultTarget });
        this.setState({ fillSrc : defaultSource }); 
        console.log("fill: " + this.state.fill);
        console.log("fill Source : " + this.state.fillSrc);
	} 

    closeAndFinish = () => {
        if(this.state.instructor) {
            console.log('going to reset');
            this.reset();
        }
        // this.setState({show : false });
         this.closeParent();
    }
    closeParent = () => {
        this.props.closeModal();
    }

    render() {
        console.log("IN POUR");
        const { instruction, done} = this.state;
        const {show} = this.props;
        console.log(show)
        const {source, target} = this.props;
        const categories = Object.keys(CATEGORIES);
        const tools = CATEGORIES["Cups"];
        const image = target.getImage();
        image.draw = IMAGES["TaperedCup"].draw;
        image.properties = {};
        image.properties.Fill = this.state.fill;
        image.properties.Color = this.state.color;
        const mytool = (
            <ToolComponent tool={new Tool("TaperedCup", image, undefined, 75, 75, undefined)} />
        );

        let imageSrc = source.getImage();
		imageSrc.draw = IMAGES["TaperedCup"].draw;
		imageSrc.properties = {};
        imageSrc.properties.Fill = this.state.fillSrc;
        imageSrc.properties.Color = this.state.colorSrc;
        const srctool = (
            <ToolComponent tool={new Tool("TaperedCup",  imageSrc, undefined, 75, 75, undefined)} />
        );
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <h2 style={style1}>{instruction}</h2>
            <Row style={{width: '70vh'}}>
            <div style={style2}>
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
        <Col>
            <Button style={{ backgroundColor: 'steelblue', alignSelf: "center", width: "20vh" }} block bsSize="large" onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown}>
                POUR
            </Button>
            <Button style={{ backgroundColor: 'steelblue', alignSelf: "center", width: "20vh" }} block bsSize="large" onClick={this.reset}>
                RESET
            </Button>
            {done ? (<Button style={{ backgroundColor: 'steelblue', alignSelf: "center", width: "20vh" }} block bsSize="large" onClick={this.closeAndFinish}>
                DONE
            </Button>) : null }
            </Col>
            </Row>
        </Modal>
    )
    }
}

const style1 = {
    alignSelf: "center",
    padding: '5vh',
}

const style2 = {
    height: '30vh',
    width:'75vh',
    paddingLeft: '200px',
    paddingBottom: '100px',
    justifyContent: "center",
    alignItems: "center"
}

export default Pour;
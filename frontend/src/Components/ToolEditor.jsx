import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-grid-system';
import { SketchPicker } from 'react-color';
import InputRange from 'react-input-range';
import { IMAGES, createImage } from '../Components/Tools.jsx';
import 'react-input-range/lib/css/index.css';

class ToolEditor extends React.Component {

    constructor(props) {
        super(props)

        this.tool = props.tool
        this.onHide = props.onHide

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeX = this.onChangeX.bind(this);
        this.onChangeY = this.onChangeY.bind(this);

        this.nameRef = React.createRef();
    }
    
    onChangeName() {
        this.tool.setName(this.nameRef.current.value)
    }

    onChangeX(value) {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();
        let x = parseInt(value, 10)
        if (x + this.tool.getWidth() > bounds.width) {
            x = bounds.width - this.tool.getWidth();
        } else if (x < 0) {
            x = 0
            this.xRef.current.value = 0;
        }
        this.tool.setPosition(x, this.tool.getPosition().getY())
        this.props.setCurrentTool(this.tool);
    }

    onChangeY(value) {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();
        let y = parseInt(value, 10)
        if (y > bounds.height) {
            y = bounds.height - this.tool.getHeight()
        } else if (y < 0) {
            y = 0
        }
        this.tool.setPosition(this.tool.getPosition().getX(), y)
        this.props.setCurrentTool(this.tool);
    }

    componentDidUpdate(prevProps) {
        if (this.props.tool !== prevProps.tool) {
            this.tool = this.props.tool
        }
    }

    render() {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();

        let supplemental = [<hr />]
        const properties = this.tool.getImage().properties;
        const keys = Object.keys(properties);
        const SUPPLEMENTAL_CONTROLS = this.getSupplementalControls();
        const supplementalControls = keys.map((key, index) => {
            return (
                <Form.Group as={Row} key={index}>
                    <Form.Label column md={2}>{key}</Form.Label>
                    <Col>
                        {SUPPLEMENTAL_CONTROLS[key]}
                    </Col>
                </Form.Group>
            );
        });

        return(
            <Modal
                id="tool-editor"
                show={this.props.show}
                onHide={this.onHide}
                size={"sm"}
                dialogAs={DraggableDialog}
            >
                <hr />
                <div style={{margin: "15px"}}>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>Name</Form.Label>
                        <Col>
                            <Form.Control
                                type={"text"}
                                defaultValue={this.tool? this.tool.getName() : null}
                                onBlur={() =>  this.props.updateTools()}
                                onChange={this.onChangeName}
                                ref={this.nameRef}
                            />
                        </Col>    
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column md={2}>X</Form.Label>
                        <Col>
                            <InputRange
                                draggableTrack
                                formatLabel={(value) => value.toFixed(2)} 
                                minValue={0} 
                                maxValue={bounds.width - this.tool.getWidth()} 
                                onChange={this.onChangeX} 
                                onChangeComplete={() => this.props.updateTools()}
                                value={this.tool ? this.tool.getPosition().getX() : null}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md={2}>Y</Form.Label>
                        <Col>
                            <InputRange
                                draggableTrack
                                formatLabel={(value) => value.toFixed(2)} 
                                minValue={0} 
                                maxValue={bounds.height - this.tool.getHeight()} 
                                onChange={this.onChangeY} 
                                onChangeComplete={() => this.props.updateTools()}
                                value={this.tool ? this.tool.getPosition().getY() : null}/>
                        </Col>
                    </Form.Group>
                    {supplementalControls} 
                </div>          
            </Modal>
        );
    }

    getSupplementalControls = () => {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();

        const {tool} = this.props;
        const SUPPLEMENTAL_CONTROLS = {
            Width: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={0} 
                        maxValue={bounds.width - tool.position.x} 
                        onChange={this.onWidthChange}
                        onChangeComplete={this.props.updateTools}
                        step={.01} 
                        value={tool.width}/>,
            Height: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={0} 
                        maxValue={bounds.height - tool.position.y} 
                        onChange={this.onHeightChange}
                        onChangeComplete={this.props.updateTools}
                        step={.01} 
                        value={tool.height}/>,
            Fill: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={0} 
                        maxValue={1} 
                        onChange={this.onFillChange}
                        onChangeComplete={this.props.updateTools}
                        step={.01} 
                        value={tool.amount}/>,
            Color: <SketchPicker 
                        disableAlpha={true} 
                        color={tool.color} 
                        onChange={this.onColorChange}
                        onChangeComplete={this.props.updateTools}/>,
            Taper: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={0} 
                        maxValue={1} 
                        onChange={this.onTaperChange}
                        onChangeComplete={this.props.updateTools}
                        step={.01} 
                        value={tool.taper}/>,
            Capacity: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={2} 
                        maxValue={32} 
                        onChange={this.onCapacityChange}
                        onChangeComplete={this.props.updateTools}
                        step={2} 
                        value={tool.image.properties.Capacity}/>,
            Intervals: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={4} 
                        maxValue={8} 
                        onChange={this.onIntervalsChange}
                        onChangeComplete={this.props.updateTools}
                        step={4} 
                        value={tool.image.properties.Intervals}/>,
        };
        return SUPPLEMENTAL_CONTROLS;
    }

    onWidthChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Width"] = value;
        tool.width = value;
        this.props.setCurrentTool(this.props.tool);
    }

    onHeightChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Height"] = value;
        tool.height = value;
        this.props.setCurrentTool(this.props.tool);
    }

    onFillChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Fill"] = value;
        tool.amount = value;
        this.props.setCurrentTool(this.props.tool);
    }

    onTaperChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Taper"] = value;
        tool.taper = value;
        this.props.setCurrentTool(this.props.tool);
    }

    onColorChange = (color, event) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Color"] = color.hex;
        tool.color = color.hex;
        this.props.setCurrentTool(this.props.tool);
    }

    onCapacityChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Capacity"] = parseInt(value, 10);
        tool.capacity = parseInt(value,10);
        tool.image.properties = properties;
        this.props.setCurrentTool(this.props.tool);
    }

    onIntervalsChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Intervals"] = parseInt(value, 10);
        tool.intervals = parseInt(value,10);
        tool.image.properties = properties;
        this.props.setCurrentTool(this.props.tool);
    }
}

class DraggableDialog extends React.Component {
	render() {
		return <Modal.Dialog {...this.props} />;
	}
}

export default ToolEditor;

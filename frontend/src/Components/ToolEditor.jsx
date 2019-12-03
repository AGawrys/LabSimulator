import React from "react"
import { Form, Modal } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-grid-system';
import { SketchPicker } from 'react-color'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class ToolEditor extends React.Component {

    constructor(props) {
        super(props)

        this.tool = props.tool
        this.onHide = props.onHide

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeX = this.onChangeX.bind(this);
        this.onChangeY = this.onChangeY.bind(this);
        this.onChangeWidth = this.onChangeWidth.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);

        this.nameRef = React.createRef();
        this.widthRef = React.createRef();
        this.heightRef = React.createRef();
    }
    
    onChangeName() {
        this.tool.setName(this.nameRef.current.value)
        this.props.setCurrentTool(this.tool);
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

    onChangeWidth() {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();
        let width = parseInt(this.widthRef.current.value, 10)
        if (width > bounds.width) {
            width = bounds.width
            if (this.tool.getPosition().getX() + width > bounds.width) {
                const x = bounds.width - width;
                this.tool.setPosition(x, this.tool.getPosition().getY());
                this.xRef.current.value = x;
            }
            this.widthRef.current.value = width;
        } else if (width < 0) {
            width = 0
            this.widthRef.current.value = 0;
        }
        this.tool.setWidth(width)
        this.props.setCurrentTool(this.tool);
    }

    onChangeHeight() {
        this.tool.setHeight(parseInt(this.heightRef.current.value, 10))
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
        const supplementalControls = keys.map(key => {
            return (
                <Form.Group as={Row}>
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
                                value={this.tool ? this.tool.getPosition().getY() : null}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column md={2}>Width</Form.Label>
                        <Col>
                            <Form.Control
                                onChange={this.onChangeWidth} 
                                type={"number"}
                                defaultValue={this.tool? this.tool.getWidth() : null}
                                ref={this.widthRef}
                            />
                        </Col>

                        <Form.Label column md={2}>Height</Form.Label>
                        <Col>
                            <Form.Control
                                onChange={this.onChangeHeight} 
                                type={"number"}
                                defaultValue={this.tool? this.tool.getHeight() : null}
                                ref={this.heightRef}
                            />
                        </Col>
                    </Form.Group>
                    {supplementalControls} 
                </div>          
            </Modal>
        );
    }

    getSupplementalControls = () => {
        const {tool} = this.props;
        const SUPPLEMENTAL_CONTROLS = {
            Fill: <InputRange
                        draggableTrack
                        formatLabel={(value) => value.toFixed(2)} 
                        minValue={0} 
                        maxValue={1} 
                        onChange={this.onFillChange}
                        step={.01} 
                        value={tool.amount}/>,
            Color: <SketchPicker color={tool.color} onChange={this.onColorChange}/>,
        };
        return SUPPLEMENTAL_CONTROLS;
    }

    onFillChange = (value) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Fill"] = value;
        tool.amount = value;
        this.props.setCurrentTool(this.props.tool);
    }

    onColorChange = (color, event) => {
        const {tool} = this.props;
        const properties = tool.getImage().properties;
        properties["Color"] = color.hex;
        tool.color = color.hex;
        this.props.setCurrentTool(this.props.tool);
    }
}

class DraggableDialog extends React.Component {
    render() {
        return (
                <Modal.Dialog {...this.props} />
        )
    }
}


export default ToolEditor;
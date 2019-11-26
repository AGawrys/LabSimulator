import React from "react"
import { Form, Modal } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-grid-system';

class DraggableDialog extends React.Component {
    render() {
        return (
                <Modal.Dialog {...this.props} />
        )
    }
}

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
        this.xRef = React.createRef();
        this.yRef = React.createRef();
        this.widthRef = React.createRef();
        this.heightRef = React.createRef();
    }
    
    onChangeName() {
        this.tool.setName(this.nameRef.current.value)
        this.props.setCurrentTool(this.tool);
    }

    onChangeX() {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();
        let x = parseInt(this.xRef.current.value, 10)
        if (x > bounds.width) {
            x = bounds.width - this.tool.getWidth()
            this.xRef.current.value = x;
        } else if (x < 0) {
            x = 0
            this.xRef.current.value = 0;
        }
        this.tool.setPosition(x, this.tool.getPosition().getY())
        this.props.setCurrentTool(this.tool);
    }

    onChangeY() {
        const canvas = document.getElementById("canvas")
        const bounds = canvas.getBoundingClientRect();
        let y = parseInt(this.yRef.current.value, 10)
        if (y > bounds.height) {
            y = bounds.height - this.tool.getHeight()
            this.yRef.current.value = y;
        } else if (y < 0) {
            y = 0
            this.yRef.current.value = 0;
        }
        this.tool.setPosition(this.tool.getPosition().getX(), y)
        this.props.setCurrentTool(this.tool);
    }

    onChangeWidth() {
        this.tool.setWidth(parseInt(this.widthRef.current.value, 10))
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
        keys.map(key => {
            const ref = React.createRef();
            supplemental.push(
                <Form.Group as={Row}>
                    <Form.Label column md={2}>{key}</Form.Label>
                    <Col>
                        <Form.Control
                            type={"number"}
                            defaultValue={properties[key]}
                            onChange={() => {
                                properties[key] = ref.current.value;
                                this.props.setCurrentTool(this.tool);
                            }}
                            ref={ref}
                        />
                    </Col>    
                </Form.Group>
            )
        })

        return(
            <Modal
                id="tool-editor"
                show={this.props.show}
                onHide={this.onHide}
                size={"sm"}
                dialogAs={DraggableDialog}
            >
                <hr />
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
                    <Form.Label column md={1}>X</Form.Label>
                    <Col>
                        <Form.Control
                            onChange={this.onChangeX} 
                            type={"number"}
                            min={0}
                            max={bounds.width - this.tool.getWidth()}
                            defaultValue={this.tool? this.tool.getPosition().getX() : null}
                            ref={this.xRef}
                        />
                    </Col>

                    <Form.Label column md={1}>Y</Form.Label>
                    <Col>
                        <Form.Control
                            onChange={this.onChangeY} 
                            type={"number"}
                            defaultValue={this.tool? this.tool.getPosition().getY() : null}
                            ref={this.yRef}
                        />
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
                {supplemental}            
            </Modal>
        )
    }
}

export default ToolEditor;
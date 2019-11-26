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
        this.tool.setPosition(parseInt(this.xRef.current.value, 10), this.tool.getPosition().getY())
        this.props.setCurrentTool(this.tool);
    }

    onChangeY() {
        this.tool.setPosition(this.tool.getPosition().getX(), parseInt(this.yRef.current.value, 10))
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

    render() {
        return(
            <Modal
                id="tool-editor"
                show={this.props.show}
                onHide={this.onHide}
                size={"sm"}
                dialogAs={DraggableDialog}
            >
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
            </Modal>
        )
    }
}

export default ToolEditor;
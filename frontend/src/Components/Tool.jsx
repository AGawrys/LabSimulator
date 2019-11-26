import React from "react";
import Draggable from 'react-draggable';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import EditorConstants from '../utils/EditorConstants.js';

class Tool extends React.Component {
    constructor(props) {
        super(props);

        this.tool = props.tool;
        this.selected = props.selected;

        this.onClick = this.onClick.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.canvas = React.createRef();
    }

    onClick(e) {
        this.props.setCurrentTool(this.tool);
        e.stopPropagation();
    }

    onDragStop(e, data) {
        this.tool.setPosition(data.x, data.y);
    }

    componentDidMount() {
        const image = this.tool.getImage();
        image.draw(this.canvas.current,
                   this.tool.getWidth(),
                   this.tool.getHeight(),
                   image.properties)
    }

    componentDidUpdate() {
        this.componentDidMount()
    }

    render() {
        let style = this.selected?
            {border: "1px green solid"} :
            {border: "1px #f3f3f3 solid"}
        const ToolCanvas = (
            <canvas
                width={this.tool.getWidth()}
                height={this.tool.getHeight()}
                style={style}
                onClick={this.props.draggable? this.onClick : null}
                ref={this.canvas}
            >
                {this.tool.getName()}
            </canvas>
        )

        let ToolComponent = ToolCanvas;
        if (this.props.draggable) {
            ToolComponent = (
                <Draggable
                    bounds={"#canvas"}
                    position={{x: this.tool.getPosition().getX(), y: this.tool.getPosition().getY()}}
                    onStop={this.onDragStop}
                >
                    {ToolCanvas}
                </Draggable>
            )
        }

        return(
            <div
                style={{
                    width: this.tool.getWidth(),
                    height: this.tool.getHeight(),
                    margin: 0,
                    position: this.props.draggable? "absolute" : "relative",
                }}
            >
                {ToolComponent}
            </div>
        );
    }
}

export default Tool;
export {Tool}
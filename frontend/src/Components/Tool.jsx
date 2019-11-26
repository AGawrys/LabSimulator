import React from "react";
import Draggable from 'react-draggable';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import EditorConstants from '../utils/EditorConstants.js';

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }   
        this.selected = props.selected;

        this.onClick = this.onClick.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.canvas = React.createRef();
    }

    onClick(e) {
        this.props.setCurrentTool(this.props.tool);
        e.stopPropagation();
    }

    onDragStop(e, data) {
        const {tool} = this.props;
        tool.setPosition(data.x, data.y);
    }

    componentDidMount() {
        const {tool} = this.props;
        const image = tool.getImage();
        image.draw(this.canvas.current,
                   tool.getWidth(),
                   tool.getHeight(),
                   image.properties)
    }

    componentDidUpdate() {
        this.componentDidMount()
    }

    render() {

        const {tool} = this.props;
        let style = this.selected?
            {border: "1px green solid"} :
            {border: "1px #f3f3f3 solid"}
        const ToolCanvas = (
            <canvas
                width={tool.getWidth()}
                height={tool.getHeight()}
                style={style}
                onClick={this.props.draggable? this.onClick : null}
                ref={this.canvas}
            >
                {tool.getName()}
            </canvas>
        )

        let ToolComponent = ToolCanvas;
        if (this.props.draggable) {
            ToolComponent = (
                <Draggable
                    bounds={"#canvas"}
                    position={{x: tool.getPosition().getX(), y: tool.getPosition().getY()}}
                    onStop={this.onDragStop}
                >
                    {ToolCanvas}
                </Draggable>
            )
        }

        return(
            <div
                style={{
                    width: tool.getWidth(),
                    height: tool.getHeight(),
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
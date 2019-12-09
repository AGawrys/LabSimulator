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
        const {x,y} = data;
        const [prevX, prevY] = [tool.position.x, tool.position.y];
        tool.setPosition(x,y);
        if (Math.abs(x - prevX) > 2 || Math.abs(y - prevY) > 2) {
            this.props.updateTools();
        }
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
        let style = this.selected ?
            {border: "1px #7fb3d8 solid"} : {border: "1px transparent solid"};
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
        const width = this.props.draggable ? 0 : tool.getWidth();
        const height = this.props.draggable ? 0 : tool.getHeight();
        return(
            <div
                style={{
                    width: width,
                    height: height,
                    top: 0,
                    left:0,
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
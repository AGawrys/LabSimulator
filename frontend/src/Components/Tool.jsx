import React from "react";
import Draggable from 'react-draggable';

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: props.tool,
            selected: false,
        }

        this.onBlur = this.onBlur.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.canvas = React.createRef();
    }

    onBlur() {
        const {tool} = this.state
        tool.stale();
    }

    onDragStop(e, data) {
        let tool = this.state.tool;
        tool.setPosition(data.x, data.y);
        this.setState({
            tool: tool,
        });
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        const tool = this.state.tool
        const image = tool.getImage();
        const path = image.draw(tool.getWidth(), tool.getHeight());
        if (canvas.getContext) {
            let context = canvas.getContext("2d");
            context.stroke(path);
        }
        if (this.props.draggable && tool.isNew()) {
            this.canvas.current.focus();
        }
    }

    render() {
        const props = this.props;
        const tool = this.state.tool;

        const ToolCanvas = (
            <canvas
                tabIndex={props.draggable? 0 : null}
                onBlur={props.draggable && tool.isNew()? this.onBlur : null}
                width={tool.getWidth()}
                height={tool.getHeight()}
                ref={this.canvas}
            >
                {tool.getName()}
            </canvas>
        )

        let ToolComponent = ToolCanvas;
        if (props.draggable) {
            ToolComponent = (
                <Draggable
                    bounds={"#canvas"}
                    defaultPosition={{x: tool.getPosition().getX(), y: tool.getPosition().getY()}}
                    onStop={this.onDragStop}
                    onClick={props.draggable? this.onClick : null}
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
                    position: props.draggable? "absolute" : "relative",
                }}
            >
                {ToolComponent}
            </div>
        );
    }
}

export default Tool;
export {Tool}
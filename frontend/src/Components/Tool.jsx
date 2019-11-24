import React from "react";
import Draggable from 'react-draggable';

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: props.tool,
            selected: false
        }

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.canvas = React.createRef();
    }

    onDragStart(e, data) {
        this.setState({
            selected: true
        })
    }

    onDragStop(e, data) {
        const canvas = document.getElementById("canvas")
        const {left, top} = canvas.getBoundingClientRect();
        let tool = this.state.tool;
        const position = tool.getPosition()
        console.log(position, data)
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
    }

    render() {
        const props = this.props;
        const tool = this.state.tool;

        const ToolCanvas = (
            <canvas
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
                    onStart={this.onDragStart}
                    onStop={this.onDragStop}
                >
                    {ToolCanvas}
                </Draggable>
            )
        }

        return(
            <div style={{
                    width: tool.getWidth(),
                    height: tool.getHeight(),
                    margin: 0,
                    position: "absolute"
            }}>
                {ToolComponent}
            </div>
        );
    }
}

export default Tool;
export {Tool}
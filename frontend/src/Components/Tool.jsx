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
        tool.setPosition(x,y);
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
		const { tool } = this.props;
		const image = tool.getImage();
        if (this.props.selected) {
		  image.draw(this.canvas.current, tool.getWidth(), tool.getHeight(), image.properties);
        }
	}

	render() {
		const { tool, actionTool, onDrag } = this.props;
		let style = this.selected ? { border: '1px #7fb3d8 solid' } : { border: '1px transparent solid' };
		const ToolCanvas = (
			<canvas
				width={tool.getWidth()}
				height={tool.getHeight()}
				style={style}
				onClick={this.props.draggable && !actionTool ? this.onClick : null}
				ref={this.canvas}
			>
				{tool.getName()}
			</canvas>
		);

        let ToolComponent = ToolCanvas;
        if (actionTool) {
        	ToolComponent = (
        		<Draggable
        			bounds={"#shake-body"} 
        			defaultPosition={{x: 50, y: 50}}
        			onDragStop={this.onDragStop} 
        			onDrag={onDrag}>
                    {ToolCanvas}
                </Draggable>
    		);
        }
        else if (this.props.draggable) {
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
                    width: width,
                    height: height,
                    top: 0,
                    left:0,
                    position: this.props.draggable ? "absolute" : "relative",
                }}
            >
                {ToolComponent}
            </div>
        );
    }
}

export default Tool;
export {Tool}

import React from "react";
import Draggable from 'react-draggable';
import {Droppable} from "react-drag-and-drop";
import {ContextMenuTrigger} from 'react-contextmenu';
import EditorConstants from '../utils/EditorConstants.js';
import Tool from "./Tool.jsx"

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTool: null
        }

        this.focusTool = this.focusTool.bind(this);
        
        this.ref = React.createRef();
        this.tools = props.tools;
        this.canvas = null;
    }

    focusTool(tool) {
        this.setState({
            focused: tool.getLayer()
        })
    }
    
    componentDidMount() {
        this.canvas = this.ref.current
    }

    render() {
        const tools = this.props.tools

        const ToolComponents = (
            tools.map((tool, index) => {
                const { x, y } = tool.position;
                return (
                    //<ContextMenuTrigger 
                        //index={index}
                        //id={EditorConstants.CONTEXT_MENU_ID}
                    //>
                                <Tool
                                    draggable
                                    tool={tool}
                                    bounds={this.canvas}
                                />
                    //</ContextMenuTrigger>
                )
            })
        );

        return (
                <Droppable 
                    style={{width: "100%", height: "100%"}}
                    types={["tool"]}
                    onDrop={this.props.onDrop}
                >
                    <div
                        id={"canvas"} 
                        style={{width: "100%", height: "100%", border: "1px solid black"}}
                        ref={this.ref}
                    >
                        {ToolComponents}
                    </div>  
                </Droppable>
        )
    }
}

export default Canvas;
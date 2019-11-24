import React from "react";
import {Droppable} from "react-drag-and-drop";
import {ContextMenuTrigger} from 'react-contextmenu';
import EditorConstants from '../utils/EditorConstants.js';
import Tool from "./Tool.jsx"

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.tools = props.tools;
    }

    render() {
        const tools = this.props.tools;

        const ToolComponents = (
            tools.map((tool, index) => {
                return (
                    <ContextMenuTrigger 
                        index={index}
                        id={EditorConstants.CONTEXT_MENU_ID}
                    >
                                <Tool
                                    draggable
                                    tool={tool}
                                />
                    </ContextMenuTrigger>
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
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "relative"
                        }}
                    >
                        {ToolComponents}
                    </div>  
                </Droppable>
        )
    }
}

export default Canvas;
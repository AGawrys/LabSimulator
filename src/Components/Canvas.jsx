import React from "react";
import {Droppable} from "react-drag-and-drop";
import Tool from "./Tool.jsx"

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tools = this.props.tools

        const ToolComponents = (
            tools.map(tool => {
                return <Tool tool={tool} />
            })
        );

        return (
            <Droppable className={this.props.className}
                       types={["tool"]}
                       onDrop={this.props.onDrop}>
                <div >
                    {ToolComponents}
                </div>
            </Droppable>
        )
    }
}

export default Canvas;
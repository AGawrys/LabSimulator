import React from "react";
import {Droppable} from "react-drag-and-drop";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: props.tools
        }
    }

    render() {
        return (
            <Droppable className={this.props.className}
                       types={["tool"]}
                       onDrop={this.props.onDrop}>
                <div >
                    {this.state.tools}
                </div>
            </Droppable>
        )
    }
}

export default Canvas;
import React from "react";
import {Droppable} from "react-drag-and-drop";
import Tool from "./Tool.jsx"
import Position from "../Objects/Position.js";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            focused: null
        }

        this.focusTool = this.focusTool.bind(this);
        this.ref = React.createRef();
    }

    focusTool(tool) {
        this.setState({
            focused: tool.getLayer()
        })
    }

    componentDidMount() {
        this.setState({
            canvas: this.ref.current
        })
    }

    render() {
        const tools = this.props.tools
        const canvas = this.state.canvas

        const ToolComponents = (
            tools.map(tool => {
                return <Tool tool={tool}
                        canvas={canvas}
                        focused={this.state.focused === tool.getLayer()}
                        focusTool={this.focusTool}
                        />
            })
        );

        return (
                <Droppable className={this.props.className}
                       types={["tool"]}
                       onDrop={this.props.onDrop}
                       >
                    <div className={this.props.className}
                         ref={this.ref}
                         >
                        {ToolComponents}
                    </div>  
                </Droppable>
        )
    }
}

export default Canvas;
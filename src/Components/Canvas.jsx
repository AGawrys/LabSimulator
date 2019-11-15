import React from "react";
import {Droppable} from "react-drag-and-drop";
import Tool from "./Tool.jsx"
import Position from "../Objects/Position.js";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null
        }

        this.ref = React.createRef();
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
                return <Tool tool={tool} canvas={canvas} />
            })
        );

        return (
                <Droppable className={this.props.className}
                       types={["tool"]}
                       onDrop={this.props.onDrop}
                       ref={this.ref}>
                    {ToolComponents}
                </Droppable>
        )
    }
}

export default Canvas;
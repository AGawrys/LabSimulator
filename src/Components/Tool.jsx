import React from "react";
import TaperedCupTool from "./TaperedCupTool";
import { relative } from "path";

const TOOLS = {
    "TaperedCup": <TaperedCupTool />
};

class Tool extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.tool.getPosition().getY() - props.canvas.position["top"])
        this.state = {
            tool: props.tool,
            style: {
                width: "15%",
                position: "relative",
                left: props.tool.getPosition().getX()  - props.canvas.position["left"],
                top: props.tool.getPosition().getY()  - props.canvas.position["top"]
            }
        }
    }

    render() {
        return(
            <div style={this.state.style}>
                {TOOLS[this.state.tool.getType()]}
            </div>
        );
    }
}

export default Tool;
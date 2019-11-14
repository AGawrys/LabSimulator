import React from "react";
import TaperedCupTool from "./TaperedCupTool";

const TOOLS = {
    "TaperedCup": <TaperedCupTool />
};

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: props.tool
        }
    }

    render() {
        console.log(Object.keys(TOOLS)[0] == this.state.tool.getType())

        return(
            TOOLS[this.state.tool.getType()]
        );
    }
}

export default Tool;
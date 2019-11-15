import React from "react";
import TaperedCupTool from "./TaperedCupTool";

const TOOLS = {
    "TaperedCup": <TaperedCupTool />
};

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: props.tool,
            style: {
                width: "15%",
                position: "relative",
                left: props.tool.getPosition().getX()  - props.canvas.position["left"],
                top: props.tool.getPosition().getY()  - props.canvas.position["top"]
            }
        }

        this.ref = React.createRef();
    }

    componentDidMount() {
        const tool = this.ref.current.getBoundingClientRect();
        const leftOffset = tool.width / 2;
        const topOffset = tool.height / 2;

        let style = {...this.state.style};
        style["left"] = style.left - leftOffset >= 0? style.left - leftOffset : 0;
        style["top"] = style.top - topOffset >= 0? style.top - topOffset: 0;

        this.setState({
            style: style
        })
    }

    render() {
        return(
            <div style={this.state.style}
                 ref={this.ref}>
                {TOOLS[this.state.tool.getType()]}
            </div>
        );
    }
}

export default Tool;
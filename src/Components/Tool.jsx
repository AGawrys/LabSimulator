import React from "react";
import TaperedCupTool from "./TaperedCupTool";

const TOOLS = {
    "TaperedCup": <TaperedCupTool />
};

class Tool extends React.Component {
    constructor(props) {
        super(props);
        const canvas = props.canvas.getBoundingClientRect();
        this.state = {
            tool: props.tool,
            style: {
                width: canvas.width * .15,
                height: canvas.width * .15,
                position: "absolute",
                left: props.tool.getPosition().getX()  - canvas.left,
                top: props.tool.getPosition().getY()  - canvas.top,
                zIndex: props.tool.getLayer(),
            }
        }

        this.onClick = this.onClick.bind(this)
        this.ref = React.createRef();
    }

    onClick() {
        console.log("Also clicked")
        this.props.focusTool(this.props.tool); 
    }

    componentDidMount() {
        const canvas = this.props.canvas.getBoundingClientRect();
        const tool = this.ref.current.getBoundingClientRect();
        const leftOffset = tool.width / 2;
        const topOffset = tool.height / 2;

        let style = {...this.state.style}, left, top;
        if (style.left - leftOffset < 0) {
            left = 0;
        } else if (style.left + tool.width > canvas.width) {
            left = canvas.width - tool.width;
        } else{
            left = style.left - leftOffset;
        }
        if (style.top - topOffset < 0) {
            top = 0;
        } else if (style.top + tool.height > canvas.height) {
            top = canvas.height - tool.height;
        } else {
            top = style.top - topOffset;
        }
        
        style.left = left;
        style.top = top;

        this.setState({
            style: style
        })
    }

    render() {
        return(
            <div style={{...this.state.style, border: document.activeElement === this.ref.current? "1px dotted black": null}}
                 onFocus={this.onClick}
                 ref={this.ref}>
                {TOOLS[this.state.tool.getType()]}
            </div>
        );
    }
}

export default Tool;
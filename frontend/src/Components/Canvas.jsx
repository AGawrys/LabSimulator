import React from "react";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: []
        }
    }

    render() {
        return this.state.tools
    }
}

export default Canvas;
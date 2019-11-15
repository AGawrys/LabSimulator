import React from "react";
import Position from "../Objects/Position.js"
import {LineCalculator} from "../LilacAlgebra.js"
import "../Styles/editor.css"

class TaperedCupTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: null,
            height: null,
            fill: 0,
            fillColor: "rgb(0,0,0)"
        }
        
        this.ref = React.createRef();
    }

    draw() {
        const canvas = this.ref.current;
        if (canvas.getContext) {
            let context = canvas.getContext("2d");

            context.beginPath();
            context.moveTo(canvas.width * .1, canvas.height * .05);
            context.lineTo(canvas.width * .2, canvas.height * .95);
            context.lineTo(canvas.width * .8, canvas.height * .95);
            context.lineTo(canvas.width * .9, canvas.height * .05);
            context.stroke()

            const left = LineCalculator(5,5,20,95)
            const right = LineCalculator(80,95,95,5)
            
            /* context.beginPath();
            context.moveTo(left.x(this.state.height * this.state.fill), this.state.height * this.state.fill);
            context.lineTo(15, this.state.height)
            context.lineTo(115, this.state.height)
            context.lineTo(right.x(this.state.height * this.state.fill), this.state.height * this.state.fill);
            context.fill() */
        }
    }

    componentDidMount() {
        const canvas = this.ref.current.getBoundingClientRect()
        this.setState({
            width: canvas.width,
            height: canvas.height
        }, this.draw);
    }

    render() {
        return (
            <div>
                <canvas style={{width: "100%", height: "100%"}}
                        width={this.state.width}
                        height={this.state.width}
                        ref={this.ref}>
                    Tapered Cup
                </canvas>
            </div>
        );
    }
}

export default TaperedCupTool;
import React from "react";
import Position from "../objects/Position.js"
import {LineCalculator} from "../LilacAlgebra.js"
import "../Styles/editor.css"

class TaperedCupTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            fill: 0,
            fillColor: "rgb(0,0,0)"
        }
        this.position = new Position(0,0);
        this.toolType = "TaperedCup";
    }

    sizeCanvas() {
        const canvas = document.getElementById(this.toolType);
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth;
    }

    draw() {
        const canvas = document.getElementById(this.toolType);
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
        this.sizeCanvas();
        this.draw();
    }

    render() {

        return (
            <div>
                <canvas id={this.toolType}>
                        Browser must be updated
                </canvas>
            </div>
        );
    }
}

export default TaperedCupTool;
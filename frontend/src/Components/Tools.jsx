import React from "react"
import {LineCalculator} from "../utils/LilacAlgebra.js"

export const CATEGORIES = {
    Cups: [
        "TaperedCup"
    ]
};

export const IMAGES = {
    TaperedCup: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                let context = canvas.getContext("2d");

                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);
    
                context.beginPath();
                context.moveTo(width * .1, height * .05);
                context.lineTo(width * .2, height * .95);
                context.lineTo(width * .8, height * .95);
                context.lineTo(width * .9, height * .05);
                context.stroke()
    
                const left = LineCalculator(width * .1, height * .05, width * .2, height * .95)
                const right = LineCalculator(width * .8, height * .95, width * .9, height * .05)
                
                const cupHeight = (height * .95) - (height * .05)
                const fillPoint = (height * .05) + (cupHeight * (1 - properties.Fill))

                context.beginPath();
                context.moveTo(left.x(fillPoint), fillPoint);
                context.lineTo(width * .2, height * .95)
                context.lineTo(width * .8, height * .95)
                context.lineTo(right.x(fillPoint), fillPoint);
                context.fill()
            }
        },
        properties: {
            Fill: 0
        }
    }
}
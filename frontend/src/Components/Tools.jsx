import React from "react"

export const CATEGORIES = {
    Cups: [
        "TaperedCup"
    ]
};

export const IMAGES = {
    TaperedCup: {
        draw: (width, height) => {
            let path = new Path2D
            path.moveTo(width * .1, height * .05);
            path.lineTo(width * .2, height * .95);
            path.lineTo(width * .8, height * .95);
            path.lineTo(width * .9, height * .05);
            return path;
        },
        properties: {
            fill: 0
        }
    }
}
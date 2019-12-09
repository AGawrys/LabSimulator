import {LineCalculator} from "../utils/LilacAlgebra.js"

const CATEGORIES = {
    Cups: [
        "TaperedCup",
        "Shaker",
        "Blender",
        "PumpBottle",
        "CupLid",
        "CupSleeve"
    ]
};

const IMAGES = {
    TaperedCup: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
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
                context.fillStyle = properties.Color;
                context.fill();
            }
        },
        properties: {
            Fill: 0,
            Color: "#03a9f4",
        }
    },
    Shaker: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);
    
                context.beginPath();
                context.moveTo(width * .33, height * .05)
                context.lineTo(width * .33, height * .13)
                context.lineTo(width * .25, height * .15);
                context.lineTo(width * .23, height * .16);
                context.lineTo(width * .20, height * .23);
                context.lineTo(width * .80, height * .23);
                context.lineTo(width * .77, height * .16);
                context.lineTo(width * .75, height * .15);
                context.lineTo(width * .67, height * .13);
                context.lineTo(width * .67, height * .05);
                context.lineTo(width * .33, height * .05);

                context.moveTo(width * .2, height * .23);
                context.lineTo(width * .3, height * .95);
                context.lineTo(width * .7, height * .95);
                context.lineTo(width * .8, height * .23);
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
    },
    Blender: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();

                context.clearRect(0, 0, bounds.width, bounds.height);
    
                context.beginPath();
                context.strokeRect(width * .35, height * .05, width * .3, height * .01);
                context.strokeRect(width * .15, height * .06, width * .65, height * .02);
                context.moveTo(width * .15, height * .08);
                context.lineTo(width * .20, height * .13);
                context.lineTo(width * .30, height * .68);
                context.lineTo(width * .70, height * .68);
                context.lineTo(width * .80, height * .08);

                context.moveTo(width * .27, height * .68);
                context.lineTo(width * .20, height * .95);
                context.lineTo(width * .80, height * .95);
                context.lineTo(width * .73, height * .68);
                context.lineTo(width * .27, height * .68);
    
                const left = LineCalculator(width * .2, height * .1, width * .3, height * .65);
                const right = LineCalculator(width * .7, height * .65, width * .8, height * .05);
    
                context.moveTo(right.x(height * .12), height * .15);
                context.lineTo(width * .90, height * .15);
                context.lineTo(width * .90, height * .55);
                context.lineTo(right.x(height * .52), height * .55);
                context.moveTo(right.x(height * .15), height * .18);
                context.lineTo(width * .87, height * .18);
                context.lineTo(width * .87, height * .52);
                context.lineTo(right.x(height * .49), height * .52);
                context.stroke()
                
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
    },
    PumpBottle: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();

                context.clearRect(0, 0, bounds.width, bounds.height);
    
                context.beginPath();
                context.strokeRect(width * .375, height * .05, width * .175, height * .025);
                context.strokeRect(width * .485, height * .075, width * .03, height * .225);
                context.strokeRect(width * .450, height * .30, width * .10, height * .05);
                context.moveTo(width * .45, height * .35);
                context.lineTo(width * .30, height * .60);
                context.lineTo(width * .30, height * .95);
                context.lineTo(width * .70, height * .95);
                context.lineTo(width * .70, height * .60);
                context.lineTo(width * .55, height * .35);
                context.stroke();
            }
        },
        properties: {
            Fill: 0
        }
    },
    CupLid: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const path = new Path2D();
                path.rect(width * .12, height * .45, width * .76, height * .05);
                path.moveTo(width * .12, height * .50);
                path.lineTo(width * .10, height * .50);
                path.lineTo(width * .05, height * .55);
                path.lineTo(width * .95, height * .55);
                path.lineTo(width * .90, height * .50);
                path.lineTo(width * .88, height * .50);
                context.fillStyle = "#F0F0F0";
                context.strokeStyle = "#000000";
                context.fill(path);
                context.stroke(path);
            }
        },
        properties: {
            Fill: 0
        }
    },
    CupSleeve: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const left = LineCalculator(width * .1, height * .05, width * .2, height * .95)
                const right = LineCalculator(width * .8, height * .95, width * .9, height * .05)

                context.beginPath();
                context.moveTo(left.x(height * .35) - width * .025, height * .325);
                context.lineTo(left.x(height * .65)  - width * .025, height * .675);
                context.lineTo(right.x(height * .65) + width * .025, height * .675);
                context.lineTo(right.x(height * .35) + width * .025, height * .325);
                context.lineTo(left.x(height * .35) - width * .025, height * .325);
                context.fillStyle = "#AD8762";
                context.fill();
                context.stroke();

            }
        },
        properties: {
            Fill: 0
        }
    }
}

function createImage(toolType) {
    const image = {};
    image.draw = IMAGES[toolType].draw;
    image.properties = {};
    Object.keys(IMAGES[toolType].properties).map((key) => {
        image.properties[key] = IMAGES[toolType].properties[key];
    });
    return image;
}

export {CATEGORIES, IMAGES, createImage};
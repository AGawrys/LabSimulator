import {LineCalculator} from "../utils/LilacAlgebra.js"

const CATEGORIES = {
    Cups: [
        "StraightCup",
        "Shaker",
        "Blender",
        "PumpBottle",
        "CupLid",
        "CupSleeve"
    ]
};

const IMAGES = {
    StraightCup: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const taper = (1 - properties.Taper) / 10

                const leftTop = width * (.05 + taper), rightTop = width * (.95 - taper);
                const leftBottom = width * (.25 - taper), rightBottom = width * (.75 + taper);
                const top = height * .05, bottom = height * .95;

                const left = LineCalculator(leftTop, top, leftBottom, bottom);
                const right = LineCalculator(rightBottom, bottom, rightTop, top);
                
                const cupHeight = bottom - top
                const fillPoint = top + (cupHeight * (1 - properties.Fill))

                context.beginPath();
                context.moveTo(left.x(fillPoint), fillPoint);
                context.lineTo(leftBottom, bottom)
                context.lineTo(rightBottom, bottom)
                context.lineTo(right.x(fillPoint), fillPoint);
                context.fillStyle = properties.Color;
                context.fill();
    
                context.beginPath();
                context.moveTo(leftTop, top);
                context.lineTo(leftBottom, bottom);
                context.lineTo(rightBottom, bottom);
                context.lineTo(rightTop, top);
                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.stroke()
            }
        },
        properties: {
            Width: 100,
            Height: 120,
            Taper: .5,
            Fill: 0,
            Color: "#03a9f4",
        },
    },
    Shaker: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const leftTop = width * .05, rightTop = width * .95;
                const leftBottom = width * .12, rightBottom = width * .88;
                const top = height * .28, bottom = height * .95;

                const left = LineCalculator(leftTop, top, leftBottom, bottom);
                const right = LineCalculator(rightBottom, bottom, rightTop, top);
                const cupHeight = bottom - top
                const fillPoint = top + (cupHeight * (1 - properties.Fill))

                context.beginPath();
                context.moveTo(left.x(fillPoint), fillPoint);
                context.lineTo(leftBottom, bottom)
                context.lineTo(rightBottom, bottom)
                context.lineTo(right.x(fillPoint), fillPoint);
                context.fillStyle = properties.Color;
                context.fill();

                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";

                context.beginPath();
                context.moveTo(leftTop, top);
                context.lineTo(leftBottom, bottom);
                context.lineTo(rightBottom, bottom);
                context.lineTo(rightTop, top);
                context.stroke()
                
                context.beginPath();
                context.moveTo(width * .25, height * .05)
                context.lineTo(width * .25, height * .10)
                context.lineTo(width * .15, height * .13);
                context.lineTo(width * .10, height * .16);
                context.lineTo(width * .05, height * .23);
                context.lineTo(width * .95, height * .23);
                context.lineTo(width * .90, height * .16);
                context.lineTo(width * .85, height * .13);
                context.lineTo(width * .75, height * .10);
                context.lineTo(width * .75, height * .05);
                context.quadraticCurveTo(width * .5, height * .03, width * .25, height * .05);
                context.stroke()

                context.clearRect(width * .03, height * .23, width * .94, height * .05);
                context.strokeRect(width * .03, height * .23, width * .94, height * .05);

                context.fillStyle = "black"
                context.font = "bold 12px Arial"
                context.textBaseline = "middle"
                for (let i = properties.Capacity - (properties.Capacity/properties.Intervals);
                     i > 0;
                     i -= properties.Capacity/properties.Intervals) {
                    console.log(i)
                    let tickHeight = top + (cupHeight * ((properties.Capacity - i)/properties.Capacity))
                    context.beginPath();
                    context.moveTo(width * .48, tickHeight);
                    context.lineTo(width * .52, tickHeight);
                    context.fillText(Number.isInteger(i)? i : i.toFixed(2), width * .54, tickHeight)
                    context.stroke();
                }
            }
        },
        properties: {
            Width: 100,
            Height: 250,
            Fill: 0,
            Color: "#03a9f4",
            Capacity: 2,
            Intervals: 4
        }
    },
    Blender: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const leftTop = width * .15, rightTop = width * .90;
                const leftBottom = width * .24, rightBottom = width * .76;
                const topLeft = height * .13, topRight = height * .07,  bottom = height * .65;

                const left = LineCalculator(leftTop, topLeft, leftBottom, bottom);
                const right = LineCalculator(rightBottom, bottom, rightTop, topRight);
                const cupHeight = bottom - topLeft
                const fillPoint = topLeft + (cupHeight * (1 - properties.Fill))

                context.beginPath();
                context.moveTo(left.x(fillPoint), fillPoint);
                context.lineTo(leftBottom, bottom)
                context.lineTo(rightBottom, bottom)
                context.lineTo(right.x(fillPoint), fillPoint);
                context.fillStyle = properties.Color;
                context.fill();

                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";
    
                context.beginPath();
                context.lineJoin = "round";
                context.moveTo(width * .30, height * .05);
                context.bezierCurveTo(width * .35, height * .04, width * .65, height * .04, width * .70, height * .05);
                context.strokeRect(width * .05, height * .05, width * .85, height * .02);
                context.moveTo(width * .05, height * .07);
                context.lineTo(leftTop, topLeft);
                context.lineTo(leftBottom, bottom);
                context.moveTo(rightBottom, bottom);
                context.lineTo(rightTop, topRight);

                context.strokeRect(width * .23, height * .65, width * .54, height * .03);
                context.moveTo(width * .23, height * .68);
                context.quadraticCurveTo(width * .15, height * .70, width * .10, height * .95);
                context.lineTo(width * .90, height * .95);
                context.quadraticCurveTo(width * .85, height * .70, width * .77, height * .68);
    
                context.moveTo(right.x(height * .12), height * .15);
                context.lineTo(width * .90, height * .15);
                context.lineTo(width * .90, height * .55);
                context.lineTo(right.x(height * .52), height * .55);
                context.moveTo(right.x(height * .15), height * .18);
                context.lineTo(width * .87, height * .18);
                context.lineTo(width * .87, height * .52);
                context.lineTo(right.x(height * .49), height * .52);
                context.stroke()
            }
        },
        properties: {
            Width: 200,
            Height: 350,
            Fill: 0,
            Color:  "#03a9f4"
        }
    },
    PumpBottle: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();

                context.clearRect(0, 0, bounds.width, bounds.height);
    
                context.beginPath();
                context.lineJoin = "round";
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
                context.lineJoin = "round";
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
                context.lineJoin = "round";
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
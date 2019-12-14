import { LineCalculator } from '../utils/LilacAlgebra.js';
import '../images/icecube.png';

const CATEGORIES = {
    Cups: [
        "StraightCup",
        "Shaker",
        "Blender",
        "PumpBottle",
        "CupLid",
        "CupSleeve",
        'IceCube', 
        'Banana', 
        'Milk', 
        'Mango', 
        'Blueberry', 
        'Strawberry', 
        'Spoon'
    ],
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
                    let tickHeight = top + (cupHeight * ((properties.Capacity - i)/properties.Capacity))
                    context.beginPath();
                    context.moveTo(width * .48, tickHeight);
                    context.lineTo(width * .52, tickHeight);
                    if (width >= 100 && height >= 100) {
                        context.fillText(Number.isInteger(i)? i : i.toFixed(2), width * .54, tickHeight)
                    }
                    context.stroke();
                }
            }
        },
        properties: {
            Width: 100,
            Height: 200,
            Fill: 0,
            Color: "#03a9f4",
            Capacity: 2,
            Intervals: 4
        }
    },
    Blender: {
        draw: (canvas, width, height, properties, animation) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const leftTop = width * .15, rightTop = width * .85;
                const leftBottom = width * .24, rightBottom = width * .76;
                const top = height * .13, bottom = height * .65;

                const left = LineCalculator(leftTop, top, leftBottom, bottom);
                const right = LineCalculator(rightBottom, bottom, rightTop, top);
                const cupHeight = bottom - top
                const fillPoint = top + (cupHeight * (1 - properties.Fill))

                context.beginPath();
                context.moveTo(left.x(fillPoint+ (cupHeight * .05 * (animation.rock - .5))), fillPoint + (cupHeight * .05 * (animation.rock - .5)));
                context.lineTo(leftBottom, bottom)
                context.lineTo(rightBottom, bottom)
                context.lineTo(right.x(fillPoint - (cupHeight * .05 * (animation.rock - .5))), fillPoint - (cupHeight * .05 * (animation.rock - .5)));
                context.quadraticCurveTo(width *.5, fillPoint + (cupHeight * .05 * animation.ramp),
                                        left.x(fillPoint + (cupHeight * .05 * (animation.rock - .5))), fillPoint + (cupHeight * .05 * (animation.rock - .5)))
                context.fillStyle = properties.Color;
                context.fill();

                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";
    
                context.beginPath();
                context.moveTo(width * .30, height * .05);
                context.bezierCurveTo(width * .35, height * .04, width * .65, height * .04, width * .70, height * .05);
                context.strokeRect(width * .05, height * .05, right.x(height * .07) - width * .05, height * .02);
                context.moveTo(width * .05, height * .07);
                context.lineTo(leftTop, top);
                context.lineTo(leftBottom, bottom);
                context.moveTo(rightBottom, bottom);
                context.lineTo(right.x(height * .07), height * .07);

                context.strokeRect(width * .23, height * .65, width * .54, height * .03);
                context.moveTo(width * .23, height * .68);
                context.quadraticCurveTo(width * .15, height * .70, width * .10, height * .95);
                context.lineTo(width * .90, height * .95);
                context.quadraticCurveTo(width * .85, height * .70, width * .77, height * .68);

                const inner = (width <= height)? width : height;
                context.moveTo(right.x(height * .15), height * .15);
                context.lineTo(width * .95, height * .15);
                context.lineTo(width * .95, height * .55);
                context.lineTo(right.x(height * .55), height * .55);
                context.moveTo(right.x(height * .15 + inner * .03), height * .15 + inner * .03);
                context.lineTo(width * .95 - inner * .03, height * .15 + inner * .03);
                context.lineTo(width * .95 - inner * .03, height * .55 - inner * .03);
                context.lineTo(right.x(height * .55 - inner * .03), height * .55 - inner * .03);
                context.stroke()

                context.fillStyle = "black"
                context.font = "bold 12px Arial"
                context.textBaseline = "middle"
                for (let i = properties.Capacity;
                     i > 0;
                     i -= properties.Capacity/properties.Intervals) {
                    let tickHeight = top + (cupHeight * ((properties.Capacity - i)/properties.Capacity))
                    context.beginPath();
                    context.moveTo(width * .48, tickHeight);
                    context.lineTo(width * .52, tickHeight);
                    if (width >= 100 && height >= 100) {
                        context.fillText(Number.isInteger(i)? i : i.toFixed(2), width * .54, tickHeight)
                    }
                    context.stroke();
                }
                if (animation.shake) {
                    if (!animation.reset) {
                        const x = Math.random() * 1.1, y = Math.random() * 1.1;
                        context.translate(x, y);
                        animation.resetX = -x;
                        animation.resetY = -y;
                    } else {
                        context.translate(animation.resetX, animation.resetY);
                    }
                } else {
                    context.setTransform(1,0,0,1,0,0);
                }
            }
        },
        properties: {
            Width: 175,
            Height: 250,
            Fill: 0,
            Color:  "#03a9f4",
            Capacity: 2,
            Intervals: 4,

        },
        animation: {
            ramp: 0,
            rock: .5,
            increasing: true,
            shake: false,
            reset: false,
            resetX: 0,
            resetY: 0,
        }
    },
    PumpBottle: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);
                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";
    
                context.beginPath();
                context.moveTo(width * .45, height * .35);
                context.quadraticCurveTo(width * .30, height * .4, width * .30, height * .60);
                context.lineTo(width * .30, height * .95);
                context.lineTo(width * .70, height * .95);
                context.lineTo(width * .70, height * .60);
                context.quadraticCurveTo(width * .70, height * .4, width * .55, height * .35);
                context.fillStyle = properties.Color;
                context.fill();
                context.stroke();
                context.fillStyle = "black";
                context.fillRect(width * .375, height * .05, width * .175, height * .025);
                context.fillRect(width * .485, height * .075, width * .03, height * .225);
                context.fillRect(width * .450, height * .30, width * .10, height * .055);
            }
        },
        properties: {
            Width: 125,
            Height: 200,
            Color: "#FFF8CF"
        }
    },
    CupLid: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";

                const path = new Path2D();
                path.rect(width * .10, height * .05, width * .80, height * .40);
                path.moveTo(width * .10, height * .45);
                path.lineTo(width * .08, height * .45);
                path.lineTo(width * .05, height * .95);
                path.lineTo(width * .95, height * .95);
                path.lineTo(width * .92, height * .45);
                path.lineTo(width * .90, height * .45);
                context.fillStyle = properties.Color;
                context.fill(path);
                context.stroke(path);
            }
        },
        properties: {
            Width: 105,
            Height: 15,
            Color: "#F0F0F0"
        }
    },
    CupSleeve: {
        draw: (canvas, width, height, properties) => {
            if (canvas.getContext) {
                const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const taper = (1 - properties.Taper) / 10

                const leftTop = width * (.05 + taper), rightTop = width * (.95 - taper);
                const leftBottom = width * (.25 - taper), rightBottom = width * (.75 + taper);
                const top = height * .05, bottom = height * .95;

                context.lineWidth = 3;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.beginPath();
                context.moveTo(leftTop, top);
                context.lineTo(leftBottom, bottom);
                context.lineTo(rightBottom, bottom);
                context.lineTo(rightTop, top);
                context.lineTo(leftTop, top);
                context.fillStyle = properties.Color;
                context.fill();
                context.stroke();

            }
        },
        properties: {
            Width: 110,
            Height: 35,
            Taper: .10,
            Color: "#AD8762"
        }
    },
	IceCube: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://www.pngkey.com/png/full/558-5588414_cute-ice-cube-cartoon.png';
			}
		},
		properties: {
            Width: 100,
            Height: 100,
        }
	},
	Banana: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://webstockreview.net/images/bananas-clipart-cute-4.png';
			}
		},
		properties: {
            Width: 100,
            Height: 100,

        }
	},
	Milk: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://easydrawingguides.com/wp-content/uploads/2018/10/Milk-Cartoon-10.png';
			}
		},
		properties: {
            Width: 100,
            Height: 100,
        }
	},
	Mango: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://cdn140.picsart.com/273156853001211.png?r1024x1024';
			}
		},
		properties: {
            Width: 100,
            Height: 100,
        }
	},
	Blueberry: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src =
					'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/46d4d6d5-b829-4f7a-812f-6e1d80822126/d30hw1n-41586600-fc0e-4d78-8b77-16f1788c2b3c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ2ZDRkNmQ1LWI4MjktNGY3YS04MTJmLTZlMWQ4MDgyMjEyNlwvZDMwaHcxbi00MTU4NjYwMC1mYzBlLTRkNzgtOGI3Ny0xNmYxNzg4YzJiM2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.K91-BgqVgawLPHg8QCHnC2RLosmYymVgBGdyRjvQDI8';
			}
		},
		properties: {
            Width: 100,
            Height: 100,
        }
	},
	Strawberry: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://image.flaticon.com/icons/png/512/284/284757.png';
			}
		},
		properties: {
            Width: 100,
            Height: 100,
        }
	} /*
	Machine: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://espressoplanet.r.worldssl.net/images/P/Barista-Front.png';
			}
		},
		properties: {}
	},*/,
	Spoon: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				ctx.clearRect(0, 0, bounds.width, bounds.height);
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src =
					'https://images.vexels.com/media/users/3/166264/isolated/preview/8ffb8d9fca4dc861a5477c376b2ce27f-cute-spoon-emoji-by-vexels.png';
			}
		},
		properties: {
            Width: 100,
            Height: 100,
        }
	},
}

function createImage(toolType) {
	const image = {};
	image.draw = IMAGES[toolType].draw;
	image.properties = {};
	Object.keys(IMAGES[toolType].properties).map((key) => {
		image.properties[key] = IMAGES[toolType].properties[key];
    });
    if (IMAGES[toolType].animation) {
        image.animation = {};
        Object.keys(IMAGES[toolType].animation).map((key) => {
            image.animation[key] = IMAGES[toolType].animation[key];
        });
    }

	return image;
}

function isImage(toolType) {
    let isImage = false;
    switch (toolType) {
        case 'IceCube':
        case 'Banana':
        case 'Mango':
        case 'Spoon':
        case 'Strawberry':
        case 'Blueberry':
        case 'Milk':
            isImage = true;
            break;
        default: 
            isImage =  false;
            
        return isImage;
    }
}

export { CATEGORIES, IMAGES, createImage };

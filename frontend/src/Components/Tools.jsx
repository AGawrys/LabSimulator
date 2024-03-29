import { LineCalculator } from '../utils/LilacAlgebra.js';
import '../images/icecube.png';

const CATEGORIES = {
	Cups: [ 'StraightCup', 'Shaker' ],
	Fruits: [ 'Mango', 'Blueberry', 'Strawberry', 'Banana' ],
	Ingredients: [ 'PumpBottle', 'IceCube', 'Milk', 'CoffeeGround', 'CoffeeBean', 'TeaBag' ],
	Appliances: [ 'Blender', 'CoffeeBeanGrinder', 'CoffeeMachine', 'CoffeePot', 'Kettle' ],
	Accessories: [ 'CupLid', 'CupSleeve' ],
	Utensils: [ 'Spoon' ]
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
                    context.save();
                    if (!animation.reset) {
                        const x = Math.random() * 1.1, y = Math.random() * 1.1;
                        context.translate(x, y);
                        animation.resetX = -x;
                        animation.resetY = -y;
                    } else {
                        context.translate(animation.resetX, animation.resetY);
                    }
                } else {
                    context.restore();
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
        draw: (canvas, width, height, properties, animation) => {
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
                context.strokeRect(width * .485, height * .077 + height * .225 * (animation.compressed), width * .03, height * .223 * (1 - animation.compressed)); // Neck
                context.strokeRect(width * .450, height * .30, width * .10, height * .055); // Cap
                context.strokeRect(width * .375, height * .05 + height * .225 * (animation.compressed), width * .175, height * .025); // Spout
            }
        },
        properties: {
            Width: 150,
            Height: 250,
            Color: "#FFF8CF"
        },
        animation: {
            compressed: 0,
            isMaxed: false,
            isMined: true,
            isReleasing: false,
        }
    },
    CoffeeBeanGrinder: {
        draw: (canvas, width, height, properties, animation) => {
            const context = canvas.getContext("2d");
                const bounds = canvas.getBoundingClientRect();
                context.clearRect(0, 0, bounds.width, bounds.height);

                const beansTop = height * .08, beansBot = height * .33;
                const beansLeftOut = width * .07, beansRightOut = width * .93;
                const beansLeftIn = width * .25, beansRightIn = width * .75;

                const groundsTop = height * .54, groundsBot = height * .95;
                const groundsLeft = width * .25, groundsRight = width * .75;

                const leftLine = LineCalculator(beansLeftOut, beansTop, beansLeftIn, beansBot);
                const rightLine = LineCalculator(beansRightIn, beansBot, beansRightOut, beansTop);
                const beansFillHeight = beansBot - (beansBot - beansTop) * (properties.Fill) * (1 - animation.grindProgress);
                const groundsFillHeight = groundsBot - (groundsBot - groundsTop) * (properties.Fill) * (animation.grindProgress * .9);
                console.log(beansFillHeight);
                console.log(groundsFillHeight);

                context.fillStyle = "#4a2c2a";
                context.moveTo(leftLine.x(beansFillHeight), beansFillHeight);
                context.lineTo(beansLeftIn, beansBot);
                context.lineTo(beansRightIn, beansBot);
                context.lineTo(rightLine.x(beansFillHeight), beansFillHeight);
                context.fill();
                context.fillRect(groundsLeft, groundsFillHeight, groundsRight - groundsLeft, groundsBot - groundsFillHeight);

                context.lineWidth = 3;
                context.lineJoin = "round";
                context.beginPath();
                context.moveTo(beansLeftOut, beansTop);
                context.lineTo(beansLeftIn, beansBot);
                context.lineTo(beansRightIn, beansBot);
                context.lineTo(beansRightOut, beansTop);
                context.stroke();
                context.strokeRect(groundsLeft, groundsTop, groundsRight - groundsLeft, groundsBot - groundsTop);

                context.fillStyle = "black";
                context.beginPath();
                context.moveTo(width * .25, height * .38);
                context.lineTo(width * .25, height * .45);
                context.moveTo(width * .75, height * .38);
                context.lineTo(width * .75, height * .45);
                context.strokeRect(width * .05, height * .05, width * .90, height * .03);
                context.strokeRect(width * .23, height * .33, width * .54, height * .05);
                context.strokeRect(width * .24, height * .50, width * .52, height * .04);
                context.strokeRect(width * .15, height * .45, width * .70, height *.50);
                context.stroke();

                if (animation.shake) {
                    context.save();
                    if (!animation.reset) {
                        const x = Math.random() * 1.1, y = Math.random() * 1.1;
                        context.translate(x, y);
                        animation.resetX = -x;
                        animation.resetY = -y;
                    } else {
                        context.translate(animation.resetX, animation.resetY);
                    }
                } else {
                    context.restore();
                    context.setTransform(1,0,0,1,0,0);
                }
        },
        properties: {
            Width: 175,
            Height: 250,
            Fill: 0
        },
        animation: {
            grindProgress: 0,
            isEmpty: false,
            shake: false,
            reset: false,
            resetX: 0,
            resetY: 0,
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
		},
		animation: {
			Color: '#0000FF'
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
		},
		animation: {
			Color: '#FFFF00'
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
		},
		animation: {
			Color: '#e4f1f2',
			Fill: 100
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
		},
		animation: {
			Color: '#FFAE42'
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
		},
		animation: {
			Color: '#0000FF'
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
		},
		animation: {
			Color: '#FF0000'
		}
	},
	CoffeeMachine: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'http://www.kuppa.ph/img/location.png';
			}
		},
		properties: {
			Width: 150,
			Height: 150
		},
		animation: {}
	},
	CoffeePot: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
                var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://d29fhpw069ctt2.cloudfront.net/icon/image/85150/preview.svg';
			}
		},
		properties: {
			Width: 100,
			Height: 100,
		},
		animation: {
            Fill: 100,
            Color: '#654321'
		}
	},
	CoffeeGround: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src =
					'https://www.pinclipart.com/picdir/big/66-660272_ground-coffee-coffee-ground-icon-png-clipart.png?fbclid=IwAR3QvlBHE-fnmsBkW1T7isj1Vgk8sKRG0bDgEV_YoHdQepb2IzDy7-AARv4';
			}
		},
		properties: {
			Width: 100,
			Height: 100
		},
		animation: {}
	},
	CoffeeBean: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src =
					'https://cdn3.iconfinder.com/data/icons/coffee-filled-line-1/100/coffee-25-512.png?fbclid=IwAR1vuWDyg9qJQEpBgJQz4Xc18VeiDV8PL2tmPLwjC78-IlJf6bmVOmjy4TA';
			}
		},
		properties: {
			Width: 100,
			Height: 100
		},
		animation: {
            Fill: 100,
            Color: '#654321'
        }
	},
	Kettle: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src =
					'https://images.vexels.com/media/users/3/134844/isolated/preview/d00662b831b4955b1c176d787eaae0f2-teapot-tea-pot-by-vexels.png';
			}
		},
		properties: {
			Width: 100,
			Height: 100
		},
		animation: {
			Fill: 100,
			Color: '#d0f0c0',
		}
	},
	TeaBag: {
		draw: (canvas, width, height) => {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var imageObj1 = new Image();
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, width, height);
				};
				imageObj1.src = 'https://icon-library.net/images/tea-bag-icon/tea-bag-icon-20.jpg';
			}
		},
		properties: {
			Width: 100,
			Height: 100
		},
		animation: {}
	},
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
			Height: 100
		},
		animation: {}
	}
};

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

export { CATEGORIES, IMAGES, createImage };

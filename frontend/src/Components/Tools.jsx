import { LineCalculator } from '../utils/LilacAlgebra.js';
import '../images/icecube.png';

const CATEGORIES = {
	Cups: [ 'StraightCup', 'Shaker' ],
	Fruits: [ 'Mango', 'Blueberry', 'Strawberry', 'Banana' ],
	Ingredients: [ 'PumpBottle', 'IceCube', 'Milk' ],
	Appliances: [ 'Blender' ],
	Accessories: [ 'CupLid', 'CupSleeve' ],
	Utensils: [ 'Spoon' ]
};

const IMAGES = {
	StraightCup: {
		draw: (canvas, width, height, properties) => {
			if (canvas.getContext) {
				const context = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				context.clearRect(0, 0, bounds.width, bounds.height);

				const taper = (1 - properties.Taper) / 10;

				const leftTop = width * (0.05 + taper),
					rightTop = width * (0.95 - taper);
				const leftBottom = width * (0.25 - taper),
					rightBottom = width * (0.75 + taper);
				const top = height * 0.05,
					bottom = height * 0.95;

				const left = LineCalculator(leftTop, top, leftBottom, bottom);
				const right = LineCalculator(rightBottom, bottom, rightTop, top);

				const cupHeight = bottom - top;
				const fillPoint = top + cupHeight * (1 - properties.Fill);

				context.beginPath();
				context.moveTo(left.x(fillPoint), fillPoint);
				context.lineTo(leftBottom, bottom);
				context.lineTo(rightBottom, bottom);
				context.lineTo(right.x(fillPoint), fillPoint);
				context.fillStyle = properties.Color;
				context.fill();

				context.beginPath();
				context.moveTo(leftTop, top);
				context.lineTo(leftBottom, bottom);
				context.lineTo(rightBottom, bottom);
				context.lineTo(rightTop, top);
				context.lineWidth = 3;
				context.lineCap = 'round';
				context.lineJoin = 'round';
				context.stroke();
			}
		},
		properties: {
			Width: 100,
			Height: 120,
			Taper: 0.5,
			Fill: 0,
			Color: '#03a9f4'
		}
	},
	Shaker: {
		draw: (canvas, width, height, properties) => {
			if (canvas.getContext) {
				const context = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				context.clearRect(0, 0, bounds.width, bounds.height);

				const leftTop = width * 0.05,
					rightTop = width * 0.95;
				const leftBottom = width * 0.12,
					rightBottom = width * 0.88;
				const top = height * 0.28,
					bottom = height * 0.95;

				const left = LineCalculator(leftTop, top, leftBottom, bottom);
				const right = LineCalculator(rightBottom, bottom, rightTop, top);
				const cupHeight = bottom - top;
				const fillPoint = top + cupHeight * (1 - properties.Fill);

				context.beginPath();
				context.moveTo(left.x(fillPoint), fillPoint);
				context.lineTo(leftBottom, bottom);
				context.lineTo(rightBottom, bottom);
				context.lineTo(right.x(fillPoint), fillPoint);
				context.fillStyle = properties.Color;
				context.fill();

				context.lineWidth = 3;
				context.lineCap = 'round';
				context.lineJoin = 'round';

				context.beginPath();
				context.moveTo(leftTop, top);
				context.lineTo(leftBottom, bottom);
				context.lineTo(rightBottom, bottom);
				context.lineTo(rightTop, top);
				context.stroke();

				context.beginPath();
				context.moveTo(width * 0.25, height * 0.05);
				context.lineTo(width * 0.25, height * 0.1);
				context.lineTo(width * 0.15, height * 0.13);
				context.lineTo(width * 0.1, height * 0.16);
				context.lineTo(width * 0.05, height * 0.23);
				context.lineTo(width * 0.95, height * 0.23);
				context.lineTo(width * 0.9, height * 0.16);
				context.lineTo(width * 0.85, height * 0.13);
				context.lineTo(width * 0.75, height * 0.1);
				context.lineTo(width * 0.75, height * 0.05);
				context.quadraticCurveTo(width * 0.5, height * 0.03, width * 0.25, height * 0.05);
				context.stroke();

				context.clearRect(width * 0.03, height * 0.23, width * 0.94, height * 0.05);
				context.strokeRect(width * 0.03, height * 0.23, width * 0.94, height * 0.05);

				context.fillStyle = 'black';
				context.font = 'bold 12px Arial';
				context.textBaseline = 'middle';
				for (
					let i = properties.Capacity - properties.Capacity / properties.Intervals;
					i > 0;
					i -= properties.Capacity / properties.Intervals
				) {
					let tickHeight = top + cupHeight * ((properties.Capacity - i) / properties.Capacity);
					context.beginPath();
					context.moveTo(width * 0.48, tickHeight);
					context.lineTo(width * 0.52, tickHeight);
					if (width >= 100 && height >= 100) {
						context.fillText(Number.isInteger(i) ? i : i.toFixed(2), width * 0.54, tickHeight);
					}
					context.stroke();
				}
			}
		},
		properties: {
			Width: 100,
			Height: 200,
			Fill: 0,
			Color: '#03a9f4',
			Capacity: 2,
			Intervals: 4
		}
	},
	Blender: {
		draw: (canvas, width, height, properties) => {
			if (canvas.getContext) {
				const context = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				context.clearRect(0, 0, bounds.width, bounds.height);

				const leftTop = width * 0.15,
					rightTop = width * 0.85;
				const leftBottom = width * 0.24,
					rightBottom = width * 0.76;
				const top = height * 0.13,
					bottom = height * 0.65;

				const left = LineCalculator(leftTop, top, leftBottom, bottom);
				const right = LineCalculator(rightBottom, bottom, rightTop, top);
				const cupHeight = bottom - top;
				const fillPoint = top + cupHeight * (1 - properties.Fill);

				context.beginPath();
				context.moveTo(left.x(fillPoint), fillPoint);
				context.lineTo(leftBottom, bottom);
				context.lineTo(rightBottom, bottom);
				context.lineTo(right.x(fillPoint), fillPoint);
				context.fillStyle = properties.Color;
				context.fill();

				context.lineWidth = 3;
				context.lineCap = 'round';
				context.lineJoin = 'round';

				context.beginPath();
				context.moveTo(width * 0.3, height * 0.05);
				context.bezierCurveTo(
					width * 0.35,
					height * 0.04,
					width * 0.65,
					height * 0.04,
					width * 0.7,
					height * 0.05
				);
				context.strokeRect(width * 0.05, height * 0.05, right.x(height * 0.07) - width * 0.05, height * 0.02);
				context.moveTo(width * 0.05, height * 0.07);
				context.lineTo(leftTop, top);
				context.lineTo(leftBottom, bottom);
				context.moveTo(rightBottom, bottom);
				context.lineTo(right.x(height * 0.07), height * 0.07);

				context.strokeRect(width * 0.23, height * 0.65, width * 0.54, height * 0.03);
				context.moveTo(width * 0.23, height * 0.68);
				context.quadraticCurveTo(width * 0.15, height * 0.7, width * 0.1, height * 0.95);
				context.lineTo(width * 0.9, height * 0.95);
				context.quadraticCurveTo(width * 0.85, height * 0.7, width * 0.77, height * 0.68);

				const inner = width <= height ? width : height;
				context.moveTo(right.x(height * 0.15), height * 0.15);
				context.lineTo(width * 0.95, height * 0.15);
				context.lineTo(width * 0.95, height * 0.55);
				context.lineTo(right.x(height * 0.55), height * 0.55);
				context.moveTo(right.x(height * 0.15 + inner * 0.03), height * 0.15 + inner * 0.03);
				context.lineTo(width * 0.95 - inner * 0.03, height * 0.15 + inner * 0.03);
				context.lineTo(width * 0.95 - inner * 0.03, height * 0.55 - inner * 0.03);
				context.lineTo(right.x(height * 0.55 - inner * 0.03), height * 0.55 - inner * 0.03);
				context.stroke();

				context.fillStyle = 'black';
				context.font = 'bold 12px Arial';
				context.textBaseline = 'middle';
				for (let i = properties.Capacity; i > 0; i -= properties.Capacity / properties.Intervals) {
					let tickHeight = top + cupHeight * ((properties.Capacity - i) / properties.Capacity);
					context.beginPath();
					context.moveTo(width * 0.48, tickHeight);
					context.lineTo(width * 0.52, tickHeight);
					if (width >= 100 && height >= 100) {
						context.fillText(Number.isInteger(i) ? i : i.toFixed(2), width * 0.54, tickHeight);
					}
					context.stroke();
				}
			}
		},
		properties: {
			Width: 175,
			Height: 250,
			Fill: 0,
			Color: '#03a9f4',
			Capacity: 2,
			Intervals: 4
		}
	},
	PumpBottle: {
		draw: (canvas, width, height, properties) => {
			if (canvas.getContext) {
				const context = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				context.clearRect(0, 0, bounds.width, bounds.height);
				context.lineWidth = 3;
				context.lineCap = 'round';
				context.lineJoin = 'round';

				context.beginPath();
				context.moveTo(width * 0.45, height * 0.35);
				context.quadraticCurveTo(width * 0.3, height * 0.4, width * 0.3, height * 0.6);
				context.lineTo(width * 0.3, height * 0.95);
				context.lineTo(width * 0.7, height * 0.95);
				context.lineTo(width * 0.7, height * 0.6);
				context.quadraticCurveTo(width * 0.7, height * 0.4, width * 0.55, height * 0.35);
				context.fillStyle = properties.Color;
				context.fill();
				context.stroke();
				context.fillStyle = 'black';
				context.fillRect(width * 0.375, height * 0.05, width * 0.175, height * 0.025);
				context.fillRect(width * 0.485, height * 0.075, width * 0.03, height * 0.225);
				context.fillRect(width * 0.45, height * 0.3, width * 0.1, height * 0.055);
			}
		},
		properties: {
			Width: 125,
			Height: 200,
			Color: '#FFF8CF'
		}
	},
	CupLid: {
		draw: (canvas, width, height, properties) => {
			if (canvas.getContext) {
				const context = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				context.clearRect(0, 0, bounds.width, bounds.height);

				context.lineWidth = 3;
				context.lineCap = 'round';
				context.lineJoin = 'round';

				const path = new Path2D();
				path.rect(width * 0.1, height * 0.05, width * 0.8, height * 0.4);
				path.moveTo(width * 0.1, height * 0.45);
				path.lineTo(width * 0.08, height * 0.45);
				path.lineTo(width * 0.05, height * 0.95);
				path.lineTo(width * 0.95, height * 0.95);
				path.lineTo(width * 0.92, height * 0.45);
				path.lineTo(width * 0.9, height * 0.45);
				context.fillStyle = properties.Color;
				context.fill(path);
				context.stroke(path);
			}
		},
		properties: {
			Width: 105,
			Height: 15,
			Color: '#F0F0F0'
		}
	},
	CupSleeve: {
		draw: (canvas, width, height, properties) => {
			if (canvas.getContext) {
				const context = canvas.getContext('2d');
				const bounds = canvas.getBoundingClientRect();
				context.clearRect(0, 0, bounds.width, bounds.height);

				const taper = (1 - properties.Taper) / 10;

				const leftTop = width * (0.05 + taper),
					rightTop = width * (0.95 - taper);
				const leftBottom = width * (0.25 - taper),
					rightBottom = width * (0.75 + taper);
				const top = height * 0.05,
					bottom = height * 0.95;

				context.lineWidth = 3;
				context.lineCap = 'round';
				context.lineJoin = 'round';
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
			Taper: 0.1,
			Color: '#AD8762'
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
			Height: 100
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
			Height: 100
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
			Height: 100
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
			Height: 100
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
			Height: 100
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
			Height: 100
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
			Height: 100
		}
	}
};

function createImage(toolType) {
	const image = {};
	image.draw = IMAGES[toolType].draw;
	image.properties = {};
	Object.keys(IMAGES[toolType].properties).map((key) => {
		image.properties[key] = IMAGES[toolType].properties[key];
	});

	return image;
}

export { CATEGORIES, IMAGES, createImage };

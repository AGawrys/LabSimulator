import Position from '../Objects/Position.js';

function determineToolPosition(size) {
	const canvas = document.getElementById('canvas');
	const { left, top, width, height } = canvas.getBoundingClientRect();
	const { pageX, pageY } = window.event;

	let x,y;
	if (pageX - size / 2 < left) {
		x = 0;
	} else if (pageX + size / 2 > width + left) {
		x = width - size;
	} else {
		x = pageX - left - size / 2;
	}

	if (pageY - size / 2 < top) {
		y = 0;
	} else if (pageY + size / 2 > height + top) {
		y = height - size;
	} else {
		y = pageY - top - size / 2;
	}

	return {x,y};
}

function toScaledPosition(position) {
	const {x,y} = position;
	const {width, height} =  getCanvasSize();
	const scaledX = x / width;
	const scaledY = y / height;
	return {x: scaledX, y: scaledY};
}

function toExactPosition(position) {
	const {x, y} = position;
	const {width, height} = getCanvasSize();
	const exactX = x * width;
	const exactY = y * height;
	return {x: exactX, y: exactY};
}

function placeTools(steps) {
	steps.map((step) => {
		step.tools.map((tool) => {
			const {x,y} = toExactPosition(tool.position);
			const newPosition =  new Position(x,y);
			tool.position = newPosition;
		});
	});
}

function getCanvasSize() {
	const canvas = document.getElementById('canvas');
	return canvas.getBoundingClientRect();
}

function resizeTools(prevCanvasSize, steps) {
	const {width, height} = getCanvasSize();
	const widthRatio = width / prevCanvasSize.width;
	const heightRatio = height / prevCanvasSize.height;
	steps.map((step) => {
		step.tools.map((tool) => resizeTool(tool,widthRatio, heightRatio));	
	});
}

function resizeTool(tool, widthRatio, heightRatio) {
	const {x,y} = tool.position;
	const {width, height} = tool;
	const scaledX = x * widthRatio;
	const scaledY = y * heightRatio;
	const scaledWidth = width * widthRatio;
	const scaledHeight = height * heightRatio;

	tool.position = new Position(scaledX, scaledY);
	tool.width = scaledWidth;
	tool.height = scaledHeight;
}

export {determineToolPosition, toScaledPosition, placeTools, getCanvasSize, resizeTools};
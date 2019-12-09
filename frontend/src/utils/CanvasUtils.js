import Position from '../Objects/Position.js';

function determineToolPosition(toolWidth, toolHeight) {
	const canvas = document.getElementById('canvas');
	const { left, top, width, height } = canvas.getBoundingClientRect();
	const { pageX, pageY } = window.event;

	let x,y;
	if (pageX - toolWidth / 2 < left) {
		x = 0;
	} else if (pageX + toolWidth / 2 > width + left) {
		x = width - toolWidth;
	} else {
		x = pageX - left - toolWidth / 2;
	}

	if (pageY - toolHeight / 2 < top) {
		y = 0;
	} else if (pageY + toolHeight / 2 > height + top) {
		y = height - toolHeight;
	} else {
		y = pageY - top - toolHeight / 2;
	}

	return {x,y};
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

export {determineToolPosition, getCanvasSize, resizeTools};
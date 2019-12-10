import Position from '../Objects/Position.js';
import {DEFAULT_TOOL_SIZE} from './EditorConstants.js';
import { IMAGES, createImage } from '../Components/Tools.jsx';


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

function determineToolSize(toolType, tools) {

	for (const tool of tools) {
		if (tool.type == toolType) {
			return {width: tool.width, height: tool.height};
		}
	}
	return {width: IMAGES[toolType].properties.Width, height: IMAGES[toolType].properties.Height};
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
		step.tools.map((tool) => tool.resize(widthRatio, heightRatio));	
	});
}

export {determineToolPosition, determineToolSize, getCanvasSize, resizeTools};
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

	return {width: IMAGES[toolType].properties.Width, height: IMAGES[toolType].properties.Height};
}

function getCanvasSize() {
	const canvas = document.getElementById('canvas');
	if (canvas === null) {
		return {width: 929, height: 738.890625};
	}
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

function isCollisionDetected(tool1, tool2) {
	return (
		tool1 !== tool2 &&
		tool1.position.x < tool2.position.x + tool2.width &&
		tool1.position.x + tool1.width > tool2.position.x &&
		tool1.position.y < tool2.position.y + tool2.height &&
		tool1.position.y + tool1.height > tool2.position.y
	);
}

function getColorMedian(colorSrc, oldColor) {
	const srcColor = colorSrc.slice(1);
	const tarColor = oldColor.slice(1);
	const srcArray = srcColor.match(/.{1,2}/g);
	const tarArray = tarColor.match(/.{1,2}/g);
	var ans = '#';
	for (var i = 0; i < srcArray.length; i++) {
	    const srcInt = parseInt(srcArray[i], 16);
	    const tarInt = parseInt(tarArray[i], 16);
	    srcArray[i] = srcInt;
	    tarArray[i] = tarInt;
	    var newColor = Math.floor((srcInt + tarInt) / 2).toString(16);
	    if (newColor.length == 1) {
	        newColor = '0' + newColor;
	    }
	    ans = ans + newColor;
	}
	return ans;
}

export {determineToolPosition, determineToolSize, getCanvasSize, resizeTools, isCollisionDetected, getColorMedian};
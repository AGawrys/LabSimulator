import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Position from '../Objects/Position.js';
import Tool from '../Objects/Tool.js';
import {createImage} from '../Components/Tools.jsx';
import { toExactPosition } from '../utils/CanvasUtils.js';


function loadLesson(data){
	const {stepInformation, lesson, published} = data;
	const {instructorEmail, name, lessonId, canvasWidth, canvasHeight} = lesson;

	const loadedSteps = stepInformation.map((stepData) => loadStep(stepData));
	const currentLesson = new Lesson(name, lessonId, published);
	const steps = loadedSteps.length === 0 ? [new Step()] : loadedSteps;

	return {
		lesson: currentLesson,
		steps: steps,
		currentStep: steps[0],
		canvasSize: {width: canvasWidth, height: canvasHeight }
	};
}


function loadStep(stepData) {
	const {toolList, step} = stepData;
	const { name, description, actionType, source, target, actionMeasurement, timer } = step;
	const loadedTools = toolList.map((tool) => loadTool(tool));
	return new Step(
			name,
			description,
			loadedTools,
			actionType,
			loadedTools[source],
			loadedTools[target],
			actionMeasurement,
			timer
	);
}

function loadTool(toolData) {
	const {toolType, x, y, width, height, toolIdentity, color, amount, name} = toolData;
	const {layer} = toolIdentity;
	const image = createImage(toolType);
	image.properties.Fill = amount;
	image.properties.Color = color;
	const position = new Position(x,y);
	const loadedTool = new Tool(toolType, image, position, width, height, layer, color, amount);
	loadedTool.setName(name);
	return loadedTool;
}

export { loadLesson };
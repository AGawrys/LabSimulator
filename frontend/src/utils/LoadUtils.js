import Lesson from '../Objects/Lesson.js';
import Step from '../Objects/Step.js';
import Position from '../Objects/Position.js';
import Tool from '../Objects/Tool.js';
import {createImage} from '../Components/Tools.jsx';


function loadLesson(data){
	const {stepInformation, lesson, published} = data;
	const {instructorEmail, name, lessonId} = lesson;

	const loadedSteps = stepInformation.map((stepData) => loadStep(stepData));
	const currentLesson = new Lesson(name, lessonId, published);
	const steps = loadedSteps.length === 0 ? [new Step()] : loadedSteps;

	return {
		lesson: currentLesson,
		steps: steps,
		currentStep: steps[0],
	};
}


function loadStep(stepData) {
	const {toolList, step} = stepData;
	const {name, description, actionType, source, target, actionMeasurement} = step;
	const loadedTools = toolList.map((tool) => loadTool(tool));
	return new Step(name, description, loadedTools, actionType, source, target, actionMeasurement);
}

function loadTool(toolData) {
	const {toolType, x, y, width, height, toolIdentity, color, amount, name} = toolData;
	const {layer} = toolIdentity;
	const image = createImage(toolType);
	image.properties.Fill = amount;
	image.properties.Color = color;
	const position = new Position(x, y);
	const loadedTool = new Tool(toolType, image, position, width, height, layer, color, amount);
	loadedTool.setName(name);
	return loadedTool;
}

export { loadLesson };
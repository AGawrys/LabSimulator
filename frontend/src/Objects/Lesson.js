import EditorConstants from '../utils/EditorConstants.js';

class Lesson {
	constructor(name = EditorConstants.DEFAULT_LESSON_NAME) {
		this.name = name;
		this.steps = [];
		this.tools = [];
		this.id = null;
	}

	getName() {
		return this.name;
	}

	getSteps() {
		return this.steps;
	}

	getTools() {
		return this.tools;
	}

	addStep(step) {
		this.steps.push(step);
	}

	addTool(tool) {
		this.tools.push(tool);
	}

	getId() {
		return this.id;
	}

	setId(id) {
		this.id = id;
	}
}

export default Lesson;

import EditorConstants from '../utils/EditorConstants.js';

class Lesson {
	constructor(name = EditorConstants.DEFAULT_LESSON_NAME, id) {
		this.name = name;
		this.id = id;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
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

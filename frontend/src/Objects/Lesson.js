import EditorConstants from '../utils/EditorConstants.js';

class Lesson {
	constructor(name = EditorConstants.DEFAULT_LESSON_NAME, id, isPublished = false) {
		this.name = name;
		this.id = id;
		this.isPublished = isPublished;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getId() {
		return this.id;
	}

	setId(id) {
		this.id = id;
	}
}

export default Lesson;

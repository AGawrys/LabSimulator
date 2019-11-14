import EditorConstants from '../utils/EditorConstants.js';

class Step {
	constructor(name=EditorConstants.DEFAULT_STEP_NAME, description=null, action=null, source=null, target=null) {
		this.name = name;
		this.description = description;
		this.action = action;
		this.source = source;
		this.target = target;
	}

	toString() {
		return this.name;
	}
}

export default Step;
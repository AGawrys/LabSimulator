import EditorConstants from '../utils/EditorConstants.js';
import Tool from './Tool.js';

class Step {

	constructor(name=EditorConstants.DEFAULT_STEP_NAME, description=null, tools=[], action=null, source=null, target=null) {
		this.name = name;
		this.description = description;
		this.action = action;
		this.source = source;
		this.target = target;
		const testTool = new Tool("Test Drag ");
		const testTool1 = new Tool("Drag me ");
		this.tools = [testTool, testTool1]
	}

	toString() {
		return this.name;
	}
}

export default Step;
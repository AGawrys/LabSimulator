import EditorConstants from '../utils/EditorConstants.js';
import Tool from './Tool.js';

class Step {
	constructor(
		name = EditorConstants.DEFAULT_STEP_NAME,
		description = null,
		tools = [],
		action = null,
		source = null,
		target = null,
		actionMeasurement = null
	) {
		this.name = name;
		this.description = description;
		this.action = action;
		this.source = source;
		this.target = target;
		this.tools = tools;
		this.actionMeasurement = actionMeasurement;
	}

	getName() {
		return this.name;
	}

	getDescription() {
		return this.description;
	}

	getAction() {
		return this.action;
	}

	getSource() {
		return this.source;
	}

	getTarget() {
		return this.target;
	}

	getTools() {
		return this.tools;
	}

	setName(name) {
		this.name = name;
	}

	setDescription(description) {
		this.description = description;
	}

	setAction(action) {
		this.action = action;
	}

	setSource(source) {
		this.source = source;
	}

	setTarget(target) {
		this.target = target;
	}

	addTool(tool) {
		this.tools.push(tool);
	}

	getActionMeasurement() {
		return this.actionMeasurement;
	}

	setActionMeasurement(actionMeasurement) {
		this.actionMeasurement = actionMeasurement;
	}

	toString() {
		return this.name;
	}
}

export default Step;

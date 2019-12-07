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
		actionMeasurement = null,
		timer = null
	) {
		this.name = name;
		this.description = description;
		this.action = action;
		this.source = source;
		this.target = target;
		this.tools = tools;
		this.actionMeasurement = actionMeasurement;
		this.timer = timer;
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

	clone() {
		const clonedTools = this.tools.map((tool) => tool.clone());
		const { name, description, action, source, target, actionMeasurement, timer } = this;
		return new Step(name, description, clonedTools, action, source, target, actionMeasurement, timer);
	}

	toString() {
		return this.name;
	}
}

export default Step;

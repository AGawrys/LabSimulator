import {DEFAULT_STEP_NAME, ACTIONS} from '../utils/EditorConstants.js';
import Tool from './Tool.js';

class Step {
	constructor(
		name = DEFAULT_STEP_NAME,
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

	isComplete() {
		if ((!this.actionMeasurement && this.action !== 'Blend') || this.tools.length === 0) {
			console.log("didnt passed 1")
			return false;
		} else if (
			!this.timer &&
			this.action !== 'Pour' &&
			this.action !== 'Pump') {
			console.log("didnt passed 2")
			return false;
		}
		console.log("passed")
		return this.isActionSet();
	}

	isActionSet() {
		if (!this.action) {
			return false;
		}
		if (this.action == 'Pour' || this.action == 'Drag' || this.action == "Stir") {
			return this.source && this.target;
		}
		return this.source;
	}

	toString() {
		return this.name;
	}

	clone() {
		const clonedTools = this.tools.map((tool) => tool.clone());
		const { name, description, action, source, target, actionMeasurement, timer } = this;
		
		let clonedSource = null, clonedTarget = null;
		if (source != null) {
			const index = this.tools.indexOf(source);
			clonedSource = clonedTools[index];
		}
		if (target != null) {
			const index = this.tools.indexOf(target);
			clonedTarget = clonedTools[index];
		}

		return new Step(name, description, clonedTools, action, clonedSource,clonedTarget, actionMeasurement, timer);
	}

	static load(stepData) {
		const {toolList, step} = stepData;
		const { name, description, actionType, source, target, actionMeasurement, timer } = step;
		const loadedTools = toolList.map((tool) => Tool.load(tool));
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

	save(lessonId, stepNumber) {
		const savedTools = this.tools.map((tool) => tool.save(lessonId, stepNumber));
		return {
			step: {
				stepIdentity: {
					lessonId: lessonId,
					stepNumber: stepNumber
				},
				name: this.name,
				description: this.description,
				actionType: this.action,
				source: this.tools.indexOf(this.source),
				target: this.tools.indexOf(this.target),
				actionMeasurement: this.actionMeasurement,
				timer: this.timer
			},
			toolList: savedTools
		};
	} 
}

export default Step;

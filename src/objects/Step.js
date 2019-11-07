class Step {
	constructor(description, action, source, target) {
		this.description = description;
		this.source = source;
		this.target = target;
	}

	toString() {
		return this.description;
	}
}

export default Step;
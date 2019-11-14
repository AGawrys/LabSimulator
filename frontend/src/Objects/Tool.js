class Tool {
	constructor(name, image, position) {
		this.name = name;
		this.image = image;
		this.position = position;
	}

	toString() {
		return this.name;
	}

	toSelectOption() {
		return {
			label: this.name,
			value: this,		
		}
	}
}

export default Tool;
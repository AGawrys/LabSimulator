import Position from './Position.js';

class Tool {
	constructor(name, image=null, position=(new Position(0,0))) {
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
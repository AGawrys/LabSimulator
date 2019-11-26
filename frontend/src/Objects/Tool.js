import Position from './Position';

class Tool {
	constructor(type, image, position = null, width, height, layer = null, color = 0, amount = 0) {
		this.name = 'Tool ' + layer;
		this.type = type;
		this.image = image;
		this.position = position;
		this.width = width;
		this.height = height;
		this.layer = layer;
		this.color = color;
		this.amount = amount;
	}

	getName() {
		return this.name;
	}

	getType() {
		return this.type;
	}

	getImage() {
		return this.image;
	}

	getPosition() {
		return this.position;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	getLayer() {
		return this.layer;
	}

	setName(name) {
		this.name = name;
	}

	setPosition(position) {
		this.position = position;
	}

	setPosition(x, y) {
		this.position = new Position(x, y);
	}

	setLayer(layer) {
		this.layer = layer;
	}

	getAmount() {
		return this.amount;
	}

	setAmount(amount) {
		this.amount = amount;
	}

	getColor() {
		return this.color;
	}

	setColor(color) {
		this.color = color;
	}

	toString() {
		return this.name;
	}

	toSelectOption() {
		return {
			label: this.name,
			value: this
		};
	}
}

export default Tool;

import Position from './Position';
import { createImage } from '../Components/Tools.jsx';

class Tool {
	constructor(type, image, position = null, width, height, layer = null, color = "#0077be", amount = 0) {
		this.name = 'Tool ' + layer;
		this.type = type;
		this.image = image;
		this.position = position;
		this.width = width;
		this.height = height;
		this.layer = layer;
		this.color = color;
		this.amount = amount;
		this.new = true;
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

	setWidth(width) {
		this.width = width;
	}

	setHeight(height) {
		this.height = height;
	}

    setLayer(layer) {
        this.layer = layer;
	}

	isNew() {
		return this.new;
	}

	stale() {
		this.new = false;
	}

	clone() {
		const {name,type,width,height,layer,color,amount} = this;
		const newPosition = this.position.clone();
		const newImage = createImage(this.type);
		newImage.properties.Fill = amount;
		newImage.properties.Color = color;
		const clonedTool = new Tool(type,newImage,newPosition,width,height,layer,color,amount);
		clonedTool.setName(name);
		return clonedTool;
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

	toScaledPosition() {
		const {x,y} = this.position;
		const canvas = document.getElementById('canvas');
		const {width, height} = canvas.getBoundingClientRect();
		const scaledX = x / width;
		const scaledY = y / height;
		return {x: scaledX, y: scaledY};
	}


}

export default Tool;

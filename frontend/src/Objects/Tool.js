import Position from './Position';
import { createImage, copyImage } from '../Components/Tools.jsx';

class Tool {
	constructor(
		type,
		image,
		position = null,
		width,
		height,
		layer = null,
		color = '#0077be',
		amount = 0,
		taper = 0.5,
		capacity = 2,
		intervals = 4
	) {
		this.name = 'Tool ' + layer;
		this.type = type;
		this.image = image;
		this.position = position;
		this.width = width;
		this.height = height;
		this.layer = layer;
		this.color = color;
		this.amount = amount;
		this.taper = taper;
		this.capacity = capacity;
		this.intervals = intervals;
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

	equals(tool) {
		return (
			this.name == tool.name &&
			this.type == tool.type &&
			this.position.x == tool.position.x &&
			this.position.y == tool.position.y &&
			this.layer == tool.layer &&
			this.imageEquals(tool)
		);
	}

	imageEquals(tool) {
		const { properties, animation } = this.image;
		for (const property in properties) {
			if (properties[property] != tool.image.properties[property]) {
				return false;
			}
		}
		for (const animationProperty in animation) {
			if (animation[animationProperty] != tool.image.animation[animationProperty]) {
				return false;
			}
		}
		return true;
	}

	clone() {
		const { name, type, width, height, layer, color, amount, taper, image, capacity, intervals } = this;
		const newPosition = this.position.clone();
		const newImage = this.cloneImage(type, image);
		const clonedTool = new Tool(
			type,
			newImage,
			newPosition,
			width,
			height,
			layer,
			color,
			amount,
			taper,
			capacity,
			intervals
		);
		clonedTool.setName(name);
		return clonedTool;
	}

	cloneImage(type, image) {
		const clonedImage = createImage(type);
		const { properties, animation } = image;
		for (const property in properties) {
			clonedImage.properties[property] = image.properties[property];
		}
		if (animation) {
			for (const animation_property in animation) {
				clonedImage.animation[animation_property] = image.animation[animation_property];
			}
		}
		return clonedImage;
	}

	resize(widthRatio, heightRatio) {
		const { x, y } = this.position;
		const { width, height } = this;
		const scaledX = x * widthRatio;
		const scaledY = y * heightRatio;
		const scaledWidth = width * widthRatio;
		const scaledHeight = height * heightRatio;

		this.position = new Position(scaledX, scaledY);
		this.width = scaledWidth;
		this.height = scaledHeight;
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

	static load(toolData) {
		const {
			toolType,
			x,
			y,
			width,
			height,
			toolIdentity,
			color,
			amount,
			capacity,
			intervals,
			taper,
			name
		} = toolData;
		const { layer } = toolIdentity;
		const image = Tool.loadImage(toolType, { color, amount, capacity, intervals, taper });
		const position = new Position(x, y);
		const loadedTool = new Tool(
			toolType,
			image,
			position,
			width,
			height,
			layer,
			color,
			amount,
			taper,
			capacity,
			intervals
		);
		loadedTool.setName(name);
		return loadedTool;
	}

	static loadImage(toolType, properties) {
		const { color, amount, capacity, intervals, taper } = properties;
		const image = createImage(toolType);
		if (image.properties.hasOwnProperty('Fill')) {
			image.properties.Fill = amount;
			image.properties.Color = color;
		}
		if (image.properties.hasOwnProperty('Capacity')) {
			image.properties.Capacity = capacity;
			image.properties.Intervals = intervals;
		}
		if (image.properties.hasOwnProperty('Taper')) {
			image.properties.Taper = taper;
		}
		return image;
	}

	save(lessonId, stepNumber) {
		return {
			toolIdentity: {
				layer: this.layer,
				stepNumber: stepNumber,
				lessonId: lessonId
			},
			toolType: this.type,
			x: this.position.x,
			y: this.position.y,
			name: this.name,
			amount: this.amount,
			color: this.color,
			height: this.height,
			width: this.width,
			taper: this.taper,
			capacity: this.capacity,
			intervals: this.intervals
		};
	}
}

export default Tool;

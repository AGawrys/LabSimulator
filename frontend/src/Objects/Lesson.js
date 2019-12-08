import {DEFAULT_LESSON_NAME} from '../utils/EditorConstants.js';
import Step from './Step.js';
import { getCanvasSize } from '../utils/CanvasUtils.js';

class Lesson {
	constructor(name = DEFAULT_LESSON_NAME, id, email, isPublished = false) {
		this.name = name;
		this.id = id;
		this.isPublished = isPublished;
		this.email = email;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getId() {
		return this.id;
	}

	setId(id) {
		this.id = id;
	}

	static load(data) {
		const {stepInformation, lesson, published} = data;
		const {instructorEmail, name, lessonId, canvasWidth, canvasHeight} = lesson;

		const loadedSteps = stepInformation.map((stepData) => Step.load(stepData));
		const steps = loadedSteps.length === 0 ? [new Step()] : loadedSteps;
		const currentLesson = new Lesson(name,lessonId,instructorEmail,published);

		return {
			lesson: currentLesson,
			steps: steps,
			currentStep: steps[0],
			canvasSize: {width: canvasWidth, height: canvasHeight }
		};
	}

	save(steps) {
		const {width, height} = getCanvasSize();
		const savedSteps = steps.map((step, index) => step.save(this.id, index));
		return {
			lesson: {
				lessonId: this.id,
				instructorEmail: this.email,
				name: this.name,
				canvasWidth: width,
				canvasHeight: height,
			},
			stepInformation: savedSteps
		};
	}
}

export default Lesson;

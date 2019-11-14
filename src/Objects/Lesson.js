class Lesson {
    constructor() {
        this.name = "Untitled Lesson"
        this.steps = [];
        this.tools = [];
    }

    getName() {
        return this.name;
    }

    getSteps() {
        return this.steps;
    }

    getTools() {
        return this.tools;
    }

    addStep(step) {
        this.steps.push(step);
    }

    addTool(tool) {
        this.tools.push(tool)
    }
}

export default Lesson;
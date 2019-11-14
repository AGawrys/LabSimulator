class Tool {
    constructor(type, position) {
        this.type = type;
        this.position = position;
    }

    getType() {
        return this.type;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }
}

export default Tool
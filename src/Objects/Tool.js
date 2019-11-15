class Tool {
    constructor(type, position, layer) {
        this.type = type;
        this.position = position;
        this.layer = layer;
    }

    getType() {
        return this.type;
    }

    getPosition() {
        return this.position;
    }

    getLayer() {
        return this.layer;
    }

    setPosition(position) {
        this.position = position;
    }

    setPosition(layer) {
        this.layer = layer;
    }
}

export default Tool
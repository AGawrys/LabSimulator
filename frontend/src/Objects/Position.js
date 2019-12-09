class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.isEqual = this.isEqual.bind(this)
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    isEqual(Position) {
        return Position.getX() === this.x &&
               Position.getY() === this.y;
    }

    clone() {
        return new Position(this.x,this.y);
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

export default Position;
export class Shape {

    static TYPES = Object.freeze({
        RECT: Symbol("RECT"),
        CIRC: Symbol("CIRC"),
        INVALID: Symbol("INVALID")
    });

    #fillColor;
    #type;

    constructor(type = Shape.TYPES.INVALID, fillColor = "#000f") {
        this.#fillColor = fillColor;
        this.#type = type;
    }

    getFillColor() {
        return this.#fillColor;
    }

    getType() {
        return this.#type;
    }
}
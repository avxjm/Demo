import {Shape} from "./shape.js";

export class Renderable {

    static TYPES = Object.freeze({
        SHAPE: Symbol("SHAPE"),
        LINE: Symbol("LINE"),
        SPRITE: Symbol("SPRITE"),
        TEXT: Symbol("TEXT"),
        EMPTY: Symbol("EMPTY")
    });

    #x;
    #y;
    #width;
    #height;
    #type;
    #icon;
    #details;

    constructor(x = 0, y = 0, width = 0, height = 0, type = Renderable.TYPES.EMPTY, icon = null, details = null) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#type = type;
        this.#icon = icon;
        this.#details = details;
    }

    getPos() {
        return {x: this.#x, y: this.#y};
    }

    getDimensions() {
        return {width: this.#width, height: this.#height};
    }

    getBoundingBox() {
        return {x: this.#x, y: this.#y, width: this.#width, height: this.#height};
    }

    getType() {
        return this.#type;
    }

    getIcon() {
        return this.#icon;
    }

    transformRelative({x, y, width, height}) {
        this.#x += (x ? x : 0);
        this.#y += (y ? y : 0);
        this.#width += (width ? width : 0);
        this.#height += (height ? height : 0);
    }

    trasformAbsolute({x, y, width, height}) {
        this.#x = (x ? x : this.#x);
        this.#y = (y ? y : this.#y);
        this.#width = (width ? width : this.#width);
        this.#height = (height ? height : this.#height);
    }

    render(ctx) {
        switch (this.#type) {
            case Renderable.TYPES.SPRITE:
                break;
            case Renderable.TYPES.SHAPE:
                if (this.#icon instanceof Shape) {
                    switch (this.#icon.getType()) {
                        case Shape.TYPES.RECT:
                            ctx.fillStyle = this.#icon.getFillColor();
                            ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
                            break;
                        case Shape.TYPES.CIRC:
                            ctx.fillStyle = this.#icon.getFillColor();
                            ctx.beginPath();
                            ctx.arc(this.#x + (this.#width / 2), this.#y + (this.#height / 2), (this.#width || this.#height) / 2, 0, 2 * Math.PI);
                            ctx.fill();
                            break;
                        default:
                            break;
                    }
                }
                break;
            case Renderable.TYPES.LINE:
                break;
            case Renderable.TYPES.TEXT:
                break;
            case Renderable.TYPES.EMPTY:
            default:
                break;
        }
    }
}
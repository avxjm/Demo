import {Renderer} from "./renderer.js";
import {Controller} from "./controller.js";
import {Renderable} from "./renderable.js";
import {Shape} from "./shape.js";

export class Root {

    #win;
    #doc;
    #canv;
    #renderer;
    #controller;
    #isRunning;

    constructor(win = null, doc = null) {
        this.#win = win;
        this.#doc = doc;

        this.#init();
        requestAnimationFrame(this.drawFrame.bind(this));
    }

    #init() {
        this.#isRunning = true;
        this.#canv = this.#doc.getElementById("canvasContent");
        let ctx = this.#canv.getContext("2d");
        this.#renderer = new Renderer(this.#canv, ctx, "#fbfffdff");
        this.#controller = new Controller(this.#canv);

        let box = new Renderable(50, 50, 50, 50, Renderable.TYPES.SHAPE, new Shape(Shape.TYPES.RECT, "#3a4"))
        this.#enqueueObj(box, "box", {south:true, east:true}, () => {
            let state = this.#controller.getStateById("box");
            box.transformRelative({x: 50/60 * (state.south ? 1 : -1), y: 50/60 * (state.east ? 1 : -1)});
            if (box.getPos().x < 0 || box.getPos().x + box.getDimensions().width > this.#canv.width) {
                state.south = !state.south;
            }
            if (box.getPos().y < 0 || box.getPos().y + box.getDimensions().height > this.#canv.height) {
                state.east = !state.east;
            }
        });
        this.#enqueueObj(new Renderable(100, 100, 100, 100, Renderable.TYPES.SHAPE, new Shape(Shape.TYPES.CIRC, "#f00a")), "circ");
    }

    drawFrame() {
        this.#update();
        this.#animate();

        if (this.#isRunning) {
            requestAnimationFrame(this.drawFrame.bind(this));
        }
    }

    #animate() {
        this.#renderer.renderFrame();
    }

    #update() {
        this.#controller.update();
    }

    #enqueueObj(obj, id, state = {}, func = () => {}) {
        this.#renderer.push(obj);
        this.#controller.add(obj, id, state, func);
    }
}
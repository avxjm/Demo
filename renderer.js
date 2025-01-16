export class Renderer {

    #canv;
    #ctx;
    #renderables = [];
    #backgroundColor;

    constructor(canv = null, ctx = null, backgroundColor = "#0000") {
        this.#canv = canv;
        this.#ctx = ctx;
        this.#backgroundColor = backgroundColor;
        this.#canv.style.backgroundColor = backgroundColor;
    }

    renderFrame() {

        this.#ctx.clearRect(0, 0, this.#canv.width, this.#canv.height);

        if (this.#renderables) {
            for (const renderable of this.#renderables) {
                renderable.render(this.#ctx);
            }
        }
    }

    setBackgroundColor(backgroundColor) {
        this.#backgroundColor = backgroundColor;
        this.#canv.style.backgroundColor = backgroundColor;
    }

    push(renderable) {
        this.#renderables.push(renderable);
    }

    pop(renderable) {
        this.#renderables.splice(this.#renderables.indexOf(renderable));
    }
}
export class Controller {

    #canv;
    #managedObjs = {};
    #managers = {};
    #states = {};

    constructor(canv) {
        this.#canv = canv;
    }

    update() {
        for (const id in this.#managedObjs) {
            if (this.#managers.hasOwnProperty(id)) {
                this.#managers[id]();
            }
        }
    }

    add(obj = null, id = "", state = {}, func = () => {}) {
        if (obj && id) {
            this.#managedObjs[id] = obj;
            this.#managers[id] = func;
            this.#states[id] = state;
        }
    }

    remove(id = "") {
        if (id && this.#managedObjs[id]) {
            delete this.#managedObjs[id];
            if (this.#managers.hasOwnProperty(id)) {
                delete this.#managers[id];
            }
            if (this.#states.hasOwnProperty(id)) {
                delete this.#states[id];
            }
        }
    }

    getStateById(id) {
        if (id && this.#managedObjs[id]) {
            return this.#states[id];
        }
    }

    setManagerById(id, func) {
        if (id && this.#managedObjs[id]) {
            this.#managers[id] = func;
        }
    }

    setStateById(id, func) {
        if (id && this.#managedObjs[id]) {
            this.#states[id] = func;
        }
    }
}
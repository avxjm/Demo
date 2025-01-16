import {Root} from "./root.js";

async function main() {
    let isPageReady = false;

    window.onload = (event) => {
        isPageReady = true;
    }

    while (!isPageReady) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    let root = new Root(window, document);
}

main();
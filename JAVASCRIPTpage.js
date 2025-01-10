let isPageReady = false;
let isRunning = false;
let canvasContentElem = null;

async function main() {
    window.onload = (event) => {
        let hook = document.getElementById("canvasContent");
        if (hook != null) {
            canvasContentElem = hook;
            isPageReady = true;
        }
    }

    while (!isPageReady) {
        let wait = new Promise(resolve => setTimeout(resolve, 10));
        await wait;
        console.log(Date.now());
    }

    init();
    for (isRunning = true; isRunning;) {
        run();
    }
}

function init() {
    console.log("Initializing...");
}

function run() {
    canvasContentElem.style.backgroundColor = "#000";
    isRunning = false;
}

main();
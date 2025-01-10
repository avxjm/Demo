let isPageReady = false;
let isRunning = false;
let canvasContentElem = null;
let context = null;
let box = {x: null, y: null, width: null, height: null, south: true, east: true};

async function main() {
    window.onload = (event) => {
        let hook = document.getElementById("canvasContent");
        if (hook != null) {
            canvasContentElem = hook;
            context = hook.getContext("2d");
            isPageReady = true;
        }
    }

    while (!isPageReady) {
        let wait = new Promise(resolve => setTimeout(resolve, 10));
        await wait;
    }

    init();
    requestAnimationFrame(animate);
}

function init() {
    isRunning = true;
    canvasContentElem.style.backgroundColor = "#f0f0f0";
    box.width = 60;
    box.height = 60;
    box.x = Math.random() * (canvasContentElem.width - box.width);
    box.y = Math.random() * (canvasContentElem.height - box.height);
}

function animate() {
    update();

    context.clearRect(0, 0, canvasContentElem.width, canvasContentElem.height);
    context.fillRect(box.x, box.y, box.width, box.height);

    if (isRunning) {
        requestAnimationFrame(animate);
    }
}

function update() {
    box.x += (50 / 60) * (box.east ? 1 : -1);
    box.y += (50 / 60) * (box.south ? 1 : -1);
    if (box.x < 0 || box.x + box.width > canvasContentElem.width) {
        box.east = !box.east;
    }
    if (box.y < 0 || box.y + box.height > canvasContentElem.height) {
        box.south = !box.south;
    }
    console.log(box.east, box.south);
}

main();
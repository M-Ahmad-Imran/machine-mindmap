
document.addEventListener('DOMContentLoaded', () => {
    const stackArrayContainer = document.getElementById('stack-array');

    for (let i = 0; i < 15; i++) {
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container-stack';

        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box-${i}`;

        const index = document.createElement('div');
        index.className = 'index';
        index.textContent = i;

        boxContainer.appendChild(box);
        boxContainer.appendChild(index);
        stackArrayContainer.appendChild(boxContainer);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const queueArrayContainer = document.getElementById('queue-array');
    for (let i = 0; i < 15; i++) {
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container-queue';

        const box = document.createElement('div');
        box.className = 'box';
        box.id = `boxe-${i}`;

        const index = document.createElement('div');
        index.className = 'index';
        index.textContent = i;

        boxContainer.appendChild(box);
        boxContainer.appendChild(index);
        queueArrayContainer.appendChild(boxContainer);
    }
});

// Array Stack Implementation

const stackArray = [];
const stackArrayContainer = document.getElementById('stack-array');
const topBoxArray = document.getElementById('top-box-array');

function pushArraystack() {
    const value = document.getElementById('stack-array-input').value;
    if (value === "") return;
    if (stackArray.length < 15) {
        stackArray.push(value);
        animateArrayStackPush(value);
        document.getElementById('stack-array-input').value = "";
    } else {
        alert("Stack Overflow");
    }
}

document.getElementById("stack-array-input").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        pushArraystack();
    }
})

document.getElementById("pushToArrayStack").addEventListener('click', pushArraystack)

function popFromArrayStack() {
    if (stackArray.length > 0) {
        stackArray.pop();
        updateArrayStack();
    } else {
        alert("Stack Underflow");
    }
}

function updateArrayStack() {
    for (let i = 0; i < 15; i++) {
        const box = document.getElementById(`box-${i}`);
        if (i < stackArray.length) {
            box.textContent = stackArray[i];
        } else {
            box.textContent = "";
        }
    }
    topBoxArray.textContent = `Top: ${stackArray.length}`;
}

function animateArrayStackPush(value) {
    const movingBox = document.createElement('div');
    movingBox.className = 'moving-box';
    movingBox.textContent = value;
    document.body.appendChild(movingBox);

    const inputElement = document.getElementById('stack-array-input');
    const topBoxRect = topBoxArray.getBoundingClientRect();
    const targetBoxRect = document.getElementById(`box-${stackArray.length - 1}`).getBoundingClientRect();

    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;

    const inputRect = inputElement.getBoundingClientRect();
    const initialLeft = inputRect.left + scrollLeft;
    const initialTop = inputRect.top + scrollTop;

    movingBox.style.position = 'absolute';
    movingBox.style.left = `${initialLeft}px`;
    movingBox.style.top = `${initialTop}px`;

    requestAnimationFrame(() => {
        movingBox.style.transition = 'all 1s ease';
        movingBox.style.left = `${topBoxRect.left + scrollLeft}px`;
        movingBox.style.top = `${topBoxRect.top + scrollTop}px`;

        movingBox.addEventListener('transitionend', () => {
            setTimeout(() => {
                movingBox.style.transition = 'all 1s ease';
                movingBox.style.left = `${targetBoxRect.left + scrollLeft}px`;
                movingBox.style.top = `${targetBoxRect.top + scrollTop}px`;

                if (movingBox) {
                    movingBox.addEventListener('transitionend', () => {
                        document.body.removeChild(movingBox);
                        updateArrayStack();
                    });
                }
            }, 500);
        });
    });
}

// Linked List Stack Implementation
class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

let stackLinkedListTop = null;
const stackLinkedListContainer = document.getElementById('stack-linkedlist');
const topBoxLinkedList = document.getElementById('top-box-linkedlist');

function pushToLinkedListStack() {
    const value = document.getElementById('stack-linkedlist-input').value;
    if (value === "") return;
    const newNode = new LinkedListNode(value);
    newNode.next = stackLinkedListTop;
    stackLinkedListTop = newNode;
    animateLinkedListStackPush(value);
    document.getElementById('stack-linkedlist-input').value = "";
}

document.getElementById("stack-linkedlist-input").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        pushToLinkedListStack();
    }
})

function popFromLinkedListStack() {
    if (stackLinkedListTop !== null) {
        stackLinkedListTop = stackLinkedListTop.next;
        updateLinkedListStack();
    } else {
        alert("Stack Underflow");
    }
}

function updateLinkedListStack() {
    stackLinkedListContainer.innerHTML = '';
    let currentNode = stackLinkedListTop;
    while (currentNode !== null) {
        const nodeBox = document.createElement('div');
        nodeBox.className = 'linked-list-node';

        const valueBox = document.createElement('div');
        valueBox.className = 'box';
        valueBox.textContent = currentNode.value;

        const pointerBox = document.createElement('div');
        pointerBox.className = 'pointer';

        const addressBox = document.createElement('div');
        addressBox.className = 'address';
        addressBox.textContent = currentNode.next ? 'Next' : 'NULL';

        nodeBox.appendChild(valueBox);
        nodeBox.appendChild(pointerBox);
        nodeBox.appendChild(addressBox);

        if (stackLinkedListContainer) {
            stackLinkedListContainer.appendChild(nodeBox);
        } else {
            alert("Mamimum limite reach!")
            break;
        }

        if (currentNode.next !== null) {
            const arrowBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            arrowBox.setAttribute("class", "svg-arrow");
            arrowBox.setAttribute("viewBox", "0 0 100 100");
            arrowBox.style.color = "White";
            arrowBox.innerHTML = `<line x1="10" y1="10" x2="90" y2="10" stroke="white" stroke-width="2" />
                                      <polygon points="85,5 95,10 85,15" fill="white" />`;
            stackLinkedListContainer.appendChild(arrowBox);
        }

        currentNode = currentNode.next;
    }
}

function animateLinkedListStackPush(value) {
    const movingBox = document.createElement('div');
    movingBox.className = 'moving-box';
    movingBox.textContent = value;
    document.body.appendChild(movingBox);

    const inputElement = document.getElementById('stack-linkedlist-input');
    const topBoxRect = topBoxLinkedList.getBoundingClientRect();

    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;

    const inputRect = inputElement.getBoundingClientRect();
    const initialLeft = inputRect.left + scrollLeft;
    const initialTop = inputRect.top + scrollTop;

    movingBox.style.position = 'absolute';
    movingBox.style.left = `${initialLeft}px`;
    movingBox.style.top = `${initialTop}px`;

    requestAnimationFrame(() => {
        movingBox.style.transition = 'all 1s ease';
        movingBox.style.left = `${topBoxRect.left + scrollLeft}px`;
        movingBox.style.top = `${topBoxRect.top + scrollTop}px`;

        movingBox.addEventListener('transitionend', () => {
            updateLinkedListStack();
            document.body.removeChild(movingBox);
        });
    });
}

// Array Queue Implementation
const queueArray = [];
const queueArrayContainer = document.getElementById('queue-array');
const frontBoxArray = document.getElementById('front-box-array');
const rearBoxArray = document.getElementById('top-queue-box-array');
const topBoxQueueArray = document.getElementById('top-box-array');

function enqueueArrayQueue() {
    const value = document.getElementById('queue-array-input').value;
    if (value === "") return;
    if (queueArray.length < 15) {
        queueArray.push(value);
        animateArrayQueueEnqueue(value);
        document.getElementById('queue-array-input').value = "";
    } else {
        alert("Queue Overflow");
    }
}

document.getElementById("queue-array-input").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        enqueueArrayQueue();
    }
});

document.getElementById("enqueueToArrayQueue").addEventListener('click', enqueueArrayQueue);

function dequeueArrayQueue() {
    if (queueArray.length > 0) {
        queueArray.shift();
        updateArrayQueue();
    } else {
        alert("Queue Underflow");
    }
}

function updateArrayQueue() {
    for (let i = 0; i < 15; i++) {
        const box = document.getElementById(`boxe-${i}`);
        if (i < queueArray.length) {
            box.textContent = queueArray[i];
        } else {
            box.textContent = "";
        }
    }
    frontBoxArray.textContent = `Front: 0`;
    rearBoxArray.textContent = `Rear: ${queueArray.length}`;
}
function animateArrayQueueEnqueue(value) {
    const movingBox = document.createElement('div');
    movingBox.className = 'moving-box';
    movingBox.textContent = value;
    document.body.appendChild(movingBox);

    const inputElement = document.getElementById('queue-array-input');
    const rearBoxRect = rearBoxArray.getBoundingClientRect();
    const targetBoxRect = document.getElementById(`boxe-${queueArray.length - 1}`).getBoundingClientRect();

    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;

    const inputRect = inputElement.getBoundingClientRect();
    const initialLeft = inputRect.left + scrollLeft;
    const initialTop = inputRect.top + scrollTop;

    movingBox.style.position = 'absolute';
    movingBox.style.left = `${initialLeft}px`;
    movingBox.style.top = `${initialTop}px`;

    requestAnimationFrame(() => {
        movingBox.style.transition = 'all 1s ease';
        movingBox.style.left = `${rearBoxRect.left + scrollLeft}px`;
        movingBox.style.top = `${rearBoxRect.top + scrollTop}px`;

        movingBox.addEventListener('transitionend', () => {
            setTimeout(() => {
                movingBox.style.transition = 'all 1s ease';
                movingBox.style.left = `${targetBoxRect.left + scrollLeft}px`;
                movingBox.style.top = `${targetBoxRect.top + scrollTop}px`;

                movingBox.addEventListener('transitionend', () => {
                    document.body.removeChild(movingBox);
                    updateArrayQueue();
                });
            }, 500);
        });
    });
}

// Queue Linked list Implementation
class LinkedListNodeQueue {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

let queueLinkedListHead = null;
let queueLinkedListTail = null;
const queueLinkedListContainer = document.getElementById('queue-linkedlist');
const frontBoxLinkedList = document.getElementById('front-box-linkedlist');

function enqueueToLinkedListQueue() {
    const value = document.getElementById('queue-linkedlist-input').value;
    if (value === "") return;
    const newNode = new LinkedListNodeQueue(value);
    if (queueLinkedListTail !== null) {
        queueLinkedListTail.next = newNode;
    }
    queueLinkedListTail = newNode;
    if (queueLinkedListHead === null) {
        queueLinkedListHead = newNode;
    }
    animateLinkedListQueueEnqueue(value);
    document.getElementById('queue-linkedlist-input').value = "";
}

document.getElementById("queue-linkedlist-input").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        enqueueToLinkedListQueue();
    }
})

function dequeueFromLinkedListQueue() {
    if (queueLinkedListHead !== null) {
        queueLinkedListHead = queueLinkedListHead.next;
        if (queueLinkedListHead === null) {
            queueLinkedListTail = null;
        }
        updateLinkedListQueue();
    } else {
        alert("Queue Underflow");
    }
}

function updateLinkedListQueue() {
    queueLinkedListContainer.innerHTML = '';
    let currentNode = queueLinkedListHead;
    while (currentNode !== null) {
        const nodeBox = document.createElement('div');
        nodeBox.className = 'linked-list-node';

        const valueBox = document.createElement('div');
        valueBox.className = 'box';
        valueBox.textContent = currentNode.value;

        const pointerBox = document.createElement('div');
        pointerBox.className = 'pointer';

        const addressBox = document.createElement('div');
        addressBox.className = 'address';
        addressBox.textContent = currentNode.next ? 'Next' : 'NULL';

        nodeBox.appendChild(valueBox);
        nodeBox.appendChild(pointerBox);
        nodeBox.appendChild(addressBox);

        if (queueLinkedListContainer) {
            queueLinkedListContainer.appendChild(nodeBox);
        } else {
            alert("Maximum Limite Reach!")
        }

        if (currentNode.next !== null) {
            const arrowBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            arrowBox.setAttribute("class", "svg-arrow");
            arrowBox.setAttribute("viewBox", "0 0 100 100");
            arrowBox.style.color = "White";
            arrowBox.innerHTML = `<line x1="10" y1="10" x2="90" y2="10" stroke="white" stroke-width="2" />
                                      <polygon points="85,5 95,10 85,15" fill="white" />`;
            queueLinkedListContainer.appendChild(arrowBox);
        }

        currentNode = currentNode.next;
    }
}

function animateLinkedListQueueEnqueue(value) {
    const movingBox = document.createElement('div');
    movingBox.className = 'moving-box';
    movingBox.textContent = value;
    document.body.appendChild(movingBox);

    const inputElement = document.getElementById('queue-linkedlist-input');
    const frontBoxRect = frontBoxLinkedList.getBoundingClientRect();

    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;

    const inputRect = inputElement.getBoundingClientRect();
    const initialLeft = inputRect.left + scrollLeft;
    const initialTop = inputRect.top + scrollTop;

    movingBox.style.position = 'absolute';
    movingBox.style.left = `${initialLeft}px`;
    movingBox.style.top = `${initialTop}px`;

    requestAnimationFrame(() => {
        movingBox.style.transition = 'all 1s ease';
        movingBox.style.left = `${frontBoxRect.left + scrollLeft}px`;
        movingBox.style.top = `${frontBoxRect.top + scrollTop}px`;

        movingBox.addEventListener('transitionend', () => {
            updateLinkedListQueue();
            document.body.removeChild(movingBox);
        });
    });
}
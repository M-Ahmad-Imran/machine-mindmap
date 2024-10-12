//  Menu
let box = document.querySelector(".box")
let navi = document.querySelector(".menubar")

box.onclick = function () {
    box.classList.toggle("active")
    navi.classList.toggle("active")
}

// Pause Button
let isPaused = false;
const togglePauseBtn = document.getElementById('togglePauseBtn');

// Pop up box

const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const modalMessage = document.getElementById('modal-message');

const showModal = (message) => {
    modalMessage.textContent = message;
    modal.style.display = 'block';
};

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

togglePauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    togglePauseBtn.value = isPaused ? 'RESUME' : 'PAUSE';
});

// Sorting

document.addEventListener("DOMContentLoaded", () => {
    generateBars();

    const BubbleSortButton = document.getElementById("BubbleSortButton");
    const SelectionSortButton = document.getElementById("SelectionSortButton");
    const InsertionSortButton = document.getElementById("InsertionSortButton");
    const quickSortButton = document.getElementById("quickSortButton");
    const mergeSortButton = document.getElementById("mergeSortButton");
    const regenerateButton = document.getElementById("regenerateButton");

    BubbleSortButton.style.display = "block"

    const handleSortClick = (buttonId, sortButton) => {
        document.getElementById(buttonId).onclick = () => {
            generateBars();
            document.querySelectorAll('.methods').forEach((element) => {
                element.style.display = "none";
            });
            sortButton.style.display = "block";
            box.classList.toggle("active");
            navi.classList.toggle("active");
        };
    };

    handleSortClick('bubbleSortBtn', BubbleSortButton);
    handleSortClick('selectionSortBtn', SelectionSortButton);
    handleSortClick('insertionSortBtn', InsertionSortButton);
    handleSortClick('quickSortBtn', quickSortButton);
    handleSortClick('mergeSortBtn', mergeSortButton);

    arraySizeInput.addEventListener("input", async () => {
        await generateBars(parseInt(arraySizeInput.value));
    });

    swapSpeedInput.addEventListener("input", () => {
        updateSwapSpeed(parseInt(swapSpeedInput.value));
    });

    const addSortingEventListener = (button, sortFunction) => {
        button.addEventListener("click", async () => {
            await performSorting(sortFunction);
        });
    };

    addSortingEventListener(BubbleSortButton, visualizeBubbleSort);
    addSortingEventListener(SelectionSortButton, visualizeSelectionSort);
    addSortingEventListener(InsertionSortButton, visualizeInsertionSort);
    addSortingEventListener(quickSortButton, startQuickSort);
    addSortingEventListener(mergeSortButton, startMergeSort);


    regenerateButton.addEventListener("click", () => {
        generateBars(parseInt(arraySizeInput.value));
    });
})

async function performSorting(sortingFunction) {
    isPaused = false;
    togglePauseBtn.textContent = 'Pause';
    await sortingFunction();
    showModal('🎉 Sorting Completed Successfully! 🎉');
}

let swapSpeed = 100; // Default swap speed

// Swapping speed function
function updateSwapSpeed(speed) {
    swapSpeed = speed;
}

// Generate Random Bar Function
function generateBars(arrayLength = 25) {
    const arrayContainer = document.getElementById("arrayContainer");
    arrayContainer.innerHTML = '';

    const dataArray = generateRandomArray(arrayLength); // Call the Random Array Generater Function

    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i];

        const bar = document.createElement("div");
        const text = document.createElement("span");

        bar.style.height = `${barHeight}px`;
        bar.classList.add("bar");

        // text.innerText = barHeight;
        text.classList.add("text");

        bar.appendChild(text);
        arrayContainer.appendChild(bar);
    }
}

// Bubble Sort Function
async function visualizeBubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            await visualizeComparison(bars[j], bars[j + 1]);
            if (parseInt(bars[j + 1].style.height) < parseInt(bars[j].style.height)) {
                if (isPaused) await waitWhilePaused();
                await visualizeSwap(bars[j], bars[j + 1]);
            }
        }
    }
}

// Selection Sort Function
async function visualizeSelectionSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            await visualizeComparison(bars[j], bars[minIndex]);
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            if (isPaused) await waitWhilePaused();
            await visualizeSwap(bars[i], bars[minIndex]);
        }
    }
}

// Insertion Sort Function
async function visualizeInsertionSort() {
    const bars = document.querySelectorAll(".bar");
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));

    for (let i = 1; i < bars.length; i++) {
        const key = parseInt(bars[i].style.height);
        let j = i - 1;

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            if (isPaused) await waitWhilePaused();
            await visualizeComparison(bars[j], bars[i]);
            bars[j + 1].style.height = bars[j].style.height;
            // bars[j + 1].innerHTML = bars[j].innerHTML;
            j = j - 1;
        }

        bars[j + 1].style.height = `${key}px`;
        // bars[j + 1].innerHTML = key;
        await new Promise(resolve => setTimeout(resolve, swapSpeed)); // Delay for visualization
    }
}

// Visualize the Swapping Process For Bubble, Selection & Insertion Sort
async function visualizeSwap(bar1, bar2) {
    const height1 = parseInt(bar1.style.height);
    const height2 = parseInt(bar2.style.height);

    // Swap heights and innerHTML
    bar1.style.height = `${height2}px`;
    // bar1.innerHTML = height2;
    bar2.style.height = `${height1}px`;
    // bar2.innerHTML = height1;

    // Wait for a short time to visualize the swap
    await new Promise(resolve => setTimeout(resolve, swapSpeed)); // Adjust the delay as needed
}

// Function to Visualize the active bars
async function visualizeComparison(bar1, bar2) {
    // Highlight bars being compared
    bar1.style.backgroundColor = "#e74c3c";
    bar2.style.backgroundColor = "#e74c3c";

    // Wait for a short time to visualize the comparison
    await new Promise(resolve => setTimeout(resolve, swapSpeed)); // Adjust the delay as needed

    // Reset bar colors
    bar1.style.backgroundColor = "darkgoldenrod";
    bar2.style.backgroundColor = "darkgoldenrod";
}

// Quick Sort

async function partition(array, left, right) {
    let pivot = array[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
            if (isPaused) await waitWhilePaused();
            await visualizeQuickComparison(j, right); // Visualize comparison
            await visualizeQuickSwap(array, i, j); // Pass indexes instead of elements
            i++;
        }
    }

    await visualizeQuickSwap(array, i, right); // Pass indexes instead of elements
    return i;
}

async function visualizeQuickSort(array, left, right) {
    if (left < right) {
        let pivotIndex = await partition(array, left, right);
        // Recursive approach for partition process
        if (isPaused) await waitWhilePaused();
        await visualizeQuickSort(array, left, pivotIndex - 1);
        await visualizeQuickSort(array, pivotIndex + 1, right);
    }
}

async function visualizeQuickComparison(idx1, idx2) {
    const bars = document.querySelectorAll(".bar");
    const bar1 = bars[idx1];
    const bar2 = bars[idx2];

    // Highlight bars being compared with different colors
    bar1.style.backgroundColor = "#3498db"; // Blue
    bar2.style.backgroundColor = "#3498db"; // Blue

    // Wait for a short time to visualize the comparison
    await new Promise(resolve => setTimeout(resolve, swapSpeed)); // Adjust the delay as needed

    // Reset bar colors after comparison
    bar1.style.backgroundColor = "green";
    bar2.style.backgroundColor = "green";
}

async function visualizeQuickSwap(array, idx1, idx2) {
    const height1 = array[idx1];
    const height2 = array[idx2];

    // Swap heights
    array[idx1] = height2;
    array[idx2] = height1;

    // Visualize the swap
    const bars = document.querySelectorAll(".bar");
    const bar1 = bars[idx1];
    const bar2 = bars[idx2];
    bar1.style.height = `${height2}px`;
    bar2.style.height = `${height1}px`;
    // bar1.innerHTML = height2;
    // bar2.innerHTML = height1;

    // Move innerHTML content along with the bars
    // const tempInnerHTML = bar1.innerHTML;
    // bar1.innerHTML = bar2.innerHTML;
    // bar2.innerHTML = tempInnerHTML;

    // Wait for a short time to visualize the swap
    await new Promise(resolve => setTimeout(resolve, swapSpeed)); // Adjust the delay as needed
}

async function startQuickSort() {
    const bars = document.querySelectorAll(".bar");
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    await visualizeQuickSort(array, 0, array.length - 1);
}

// Merge Sort

async function startMergeSort() {
    const bars = document.querySelectorAll(".bar");
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    if (isPaused) await waitWhilePaused();
    await mergeSort(array, 0, array.length - 1);
}

async function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        if (isPaused) await waitWhilePaused();
        await visualizeMergeSort(arr, left, mid, right);
    }
}

async function visualizeMergeSort(arr, left, mid, right) {
    const tempArr = arr.slice(); // Create a copy of the array

    let i = left;
    let j = mid + 1;
    let k = left;

    while (i <= mid && j <= right) {
        if (tempArr[i] <= tempArr[j]) {
            arr[k++] = tempArr[i++];
        } else {
            arr[k++] = tempArr[j++];
        }

        // Update visualization for the two bars being compared
        const bars = document.querySelectorAll(".bar");
        bars[k - 1].style.backgroundColor = "red"; // Highlight the current bar being swapped
        // bars[k - 1].innerHTML = tempArr[k - 1]; // Move innerHTML content
        if (isPaused) await waitWhilePaused();
        await delay(swapSpeed); // Delay to visualize each step
        bars[k - 1].style.height = `${arr[k - 1]}px`; // Update the height of the bar
        bars[k - 1].style.backgroundColor = "blue"; // Reset the color
    }

    // Copy remaining elements from the left subarray
    while (i <= mid) {
        arr[k++] = tempArr[i++];

        // Update visualization for the bar being copied
        const bars = document.querySelectorAll(".bar");
        bars[k - 1].style.backgroundColor = "red"; // Highlight the current bar being copied
        // bars[k - 1].innerHTML = tempArr[k - 1]; // Move innerHTML content
        if (isPaused) await waitWhilePaused();
        await delay(swapSpeed); // Delay to visualize each step
        bars[k - 1].style.height = `${arr[k - 1]}px`; // Update the height of the bar
        bars[k - 1].style.backgroundColor = "blue"; // Reset the color
    }

    // Update the visualization to reflect the sorted portion of the array
    renderArray(arr);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function renderArray(arr) {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < arr.length; i++) {
        // bars[i].innerHTML = arr[i];
        bars[i].style.height = `${arr[i]}px`;
    }
}

// Generate Array!

function generateRandomArray(length) {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * 400) + 50); // Adjust the range as needed
    }
    return randomArray;
}

// Check the Pause State!

async function waitWhilePaused() {
    while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
    }
}
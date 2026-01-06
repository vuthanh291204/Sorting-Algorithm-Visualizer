// 1. Khai bao cac bien va lay phan tu DOM
// 1.1. Khai bao bien
let curArr = [];
let isSorting = false;
let isCompareMode = false;
const defaultLegend = [
    {color: "lightseagreen", text: "Unsorted"},
    {color: "orange", text: "Comparing"},
    {color: "red", text: "Swapping"},
    {color: "green", text: "Sorted"},
];
const algoLegends = {
    "1": defaultLegend,
    "2": defaultLegend,
    "3": defaultLegend,
    "4": [
        {color: "lightseagreen", text: "Unsorted"},
        {color: "orange", text: "Comparing"},
        {color: "red", text: "Swapping"},
        {color: "green", text: "Sorted"},
        {color: "violet", text: "Pivot"}
    ],
    "5": [
        {color: "lightseagreen", text: "Unsorted"},
        {color: "orange", text: "Comparing"},
        {color: "red", text: "Swapping"},
        {color: "green", text: "Sorted"},
        {color: "blue", text: "Merging"},
        {color: "yellow", text: "Left part"},
        {color: "hotpink", text: "Right part"},
    ],
    "6": defaultLegend,
    "default": defaultLegend
};
const algoEvaluations = {
    "1": {time: "O(n&#178;)", stable: "Yes"},
    "2": {time: "O(n&#178;)", stable: "No"},
    "3": {time: "O(n&#178;)", stable: "Yes"},
    "4": {time: "O(nlogn)", stable: "No"},
    "5": {time: "O(nlogn)", stable: "Yes"},
    "6": {time: "O(nk)", stable: "Yes"}, 
    "default": {time: "O(n&#178;)", stable: "Yes"}
};

// 1.2. Lay phan tu DOM
const singleContainer = document.querySelector("#single-container");
const compareContainer = document.querySelector("#compare-container");
const barContainer1 = document.querySelector("#bar-container-1");
const barContainer2 = document.querySelector("#bar-container-2");
const customBtn = document.querySelector("#custom");
const randomBtn = document.querySelector("#random");
const switchMode = document.querySelector("#switch");
const inputContainer = document.querySelector("#input");
const inputElements = document.querySelector("#elements");
const setArrBtn = document.querySelector("#set-array");
const playBtn = document.querySelector("#play");
const algoSelect1 = document.querySelector("#selection1");
const algoSelect2Container = document.querySelector(".algo-selection-2");
const algoSelect2 = document.querySelector("#selection2");
const speedSelect = document.querySelector("#select-speed");
const singleLegend = document.querySelector("#single-annotate");
const legend1 = document.querySelector("#annotate-1");
const legend2 = document.querySelector("#annotate-2");
const singleEvaluate = document.querySelector("#single-evaluate");
const evaluate1 = document.querySelector("#evaluate-1");
const evaluate2 = document.querySelector("#evaluate-2");

// 2. Xay dung cac ham
// 2.1. Cac ham ve giao dien
function drawBars(array, container){
    if(!container) return;
    container.innerHTML= "";
    array.forEach(val => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${val*3}px`;
        const label = document.createElement("div");
        label.classList.add("bar-label");
        label.innerText = val;
        bar.appendChild(label);
        container.appendChild(bar);
    });
}
function drawLegends(algoId, legendDiv){
    if(!legendDiv) return;
    const data = algoLegends[algoId] || algoLegends["default"];
    legendDiv.innerHTML = "";
    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "d-flex align-items-center me-3 mb-2"
        div.innerHTML = `
            <div class="color-box"
                style="background-color: ${item.color}; 
                width: 16px; 
                height: 16px; 
                border-radius: 3px; 
                border: 1px solid #ccc; 
                margin-right: 8px;">
            </div>
            <small style="font-weight: 500;">${item.text}</small>
        `;
        legendDiv.appendChild(div);
    });
}
function evaluateAlgo(algoId, evaluateDiv){
    if(!evaluateDiv) return;
    const info = algoEvaluations[algoId];
    const timeSpan = evaluateDiv.querySelector("#time-complexity");
    const stableSpan = evaluateDiv.querySelector("#stable");
    if(timeSpan){
        timeSpan.innerHTML = info.time;
    }
    if(stableSpan){
        stableSpan.innerHTML = info.stable;
    }
}
function refreshUI(){
    if(isCompareMode){
        drawBars(curArr, barContainer1);
        drawBars(curArr, barContainer2);
        drawLegends(algoSelect1.value, legend1);
        drawLegends(algoSelect2.value, legend2);
        evaluateAlgo(algoSelect1.value, evaluate1);
        evaluateAlgo(algoSelect2.value, evaluate2);
        algoSelect2Container.style.visibility = "visible";
    }
    else{
        drawBars(curArr, singleContainer.querySelector(".bar-container"));
        drawLegends(algoSelect1.value, singleLegend);
        evaluateAlgo(algoSelect1.value, singleEvaluate);
    }
}
function updatePlayBtnUI(running){
    if(running){
        playBtn.innerHTML = `<i class="bi bi-pause"></i> Pause`;
    }
    else{
        playBtn.innerHTML = `<i class="bi bi-play"></i> Run`;
    }
}

// 2.2. Cac ham logic du lieu
function generateArray(){
    if(isSorting) return;
    curArr = [];
    for(let i=0; i<7; i++){
        curArr.push(Math.floor(Math.random()*95)+5);
    }
    refreshUI();
}
function handleCustomInput(){
    const rawString = inputElements.value.trim();
    if(!rawString){
        alert("Please enter the numbers");
        return;
    }
    const stringArr = rawString.split(/[\s,]+/);
    const validNumbers = stringArr.map(str => parseInt(str)).filter(
        num => { return !isNaN(num) && num>0 && num <100 }
    );
    if(validNumbers.length === 0){
        alert("Invalid data! Please enter numbers from 1 to 99");
        return;
    }
    if(validNumbers.length > 15){
        alert("For best results, enter a maximum of 15 numbers!");
        curArr = validNumbers.slice(0, 15);
    }
    else{
        curArr = validNumbers;
    }
    refreshUI();
    if(inputContainer){
        inputContainer.style.display = "none";
    }
}

// 2.3. Ham dieu phoi thuat toan
async function runAlgo(algoId, container){
    if(!container) return;
    const bars = container.querySelectorAll(".bar");
    if(bars.length === 0) return;
    switch(algoId){
        case "1":
            await bubbleSort(bars);
            break;
        case "2":
            await selectionSort(bars);
            break;
        case "3":
            await insertionSort(bars);
            break;
        case "4":
            await quickSort(bars, 0, bars.length-1);
            break;
        case "5":
            await mergeSort(bars, 0, bars.length-1);
            break;
        case "6":
            await radixSort(bars);
            break;
        default:
            await bubbleSort(bars);
            break;
    }
}

// 2.4. Ham vo hieu hoa nut
function disableControls(disable){
    customBtn.disabled = disable;
    randomBtn.disabled = disable;
    switchMode.disabled = disable;
    algoSelect1.disabled = disable;
    algoSelect2.disabled = disable;
    speedSelect.disabled = disable;
}

// 3. Gan su kien
customBtn.addEventListener("click", () => {
    if(input.style.display === "none"){
        inputContainer.style.display = "flex";
    }
    else{
        inputContainer.style.display = "none";
    }
});
randomBtn.addEventListener("click", () => {
    generateArray();
    inputContainer.style.display = "none";
});
setArrBtn.addEventListener("click", () => {
    handleCustomInput();
});
switchMode.addEventListener("click",() => {
    isCompareMode = !isCompareMode;
    if(isCompareMode){
        singleContainer.style.display = "none";
        compareContainer.style.display = "block";
        algoSelect2Container.style.visibility = "visible";
    }
    else{
        singleContainer.style.display = "block";
        compareContainer.style.display = "none";
        algoSelect2Container.style.visibility = "hidden";
    }
    refreshUI();
});
algoSelect1.addEventListener("change", () => {
    refreshUI();
});
algoSelect2.addEventListener("change", () => {
    refreshUI();
});
playBtn.addEventListener("click", async function(){
    if(isSorting){
        isPaused = !isPaused;
        updatePlayBtnUI(!isPaused);
        return;
    }
    isSorting = true;
    isPaused = false;
    updatePlayBtnUI(true);
    disableControls(true);
    if(isCompareMode){
        await Promise.all([
            runAlgo(algoSelect1.value, barContainer1),
            runAlgo(algoSelect2.value, barContainer2)
        ]);
    }
    else{
        await runAlgo(algoSelect1.value, singleContainer.querySelector(".bar-container"));
    }
    isSorting = false;
    isPaused = false;
    updatePlayBtnUI(false);
    disableControls(false);
});
speedSelect.addEventListener("change", () => {
    switch(speedSelect.value){
        case "1":
            delay = 2000;
            break;
        case "2":
            delay = 1000/3*4;
            break;
        case "3":
            delay = 1000;
            break;
        case "4":
            delay = 1000/3*2;
            break;
        case "5":
            delay = 500;
            break;
        default:
            delay = 1000;
            break;
    }
});

// 4. Khoi tao khi tao trang
window.onload = () => {
    document.querySelector("#random").click();
};

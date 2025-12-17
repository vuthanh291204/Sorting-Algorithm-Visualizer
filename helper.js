// bien thoi gian giua 2 buoc sap xep
let delay = 1000;

// bien kiem tra xem co tam dung khong
let isPaused = false;

// ham cho giua cac buoc sap xep
async function wait(milisec){
    return new Promise(async resole => {
        while(isPaused){
            await new Promise(r => setTimeout(r, 100));
        }
        setTimeout(() => {resole('')}, milisec);
    });
}

// ham doi chieu cao 2 cot
function swap(b1, b2){
    let temp = b1.style.height;
    b1.style.height = b2.style.height;
    b2.style.height = temp;
}

// ham doi mau cho cot
function setColor(b, color){
    b.style.backgroundColor = color;
}

// ham lay gia tri so tu chieu cao cot
function getValue(b){
    return parseInt(b.style.height);
}

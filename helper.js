// ====================
// FILE: helper.js
// ====================

// Biến thời gian
let delay = 1000;
let isPaused = false;

async function wait(milisec) {
  return new Promise(async (resolve) => {
    // Fixed typo
    while (isPaused) {
      await new Promise((r) => setTimeout(r, 100));
    }
    setTimeout(() => {
      resolve("");
    }, milisec); // Fixed typo
  });
}

function swap(b1, b2) {
  // Swap chiều cao
  let tempHeight = b1.style.height;
  b1.style.height = b2.style.height;
  b2.style.height = tempHeight;

  // Swap con số hiển thị
  let label1 = b1.querySelector(".bar-label");
  let label2 = b2.querySelector(".bar-label");
  let tempText = label1.innerText;
  label1.innerText = label2.innerText;
  label2.innerText = tempText;
}

// Hàm mới: Dùng cho Merge Sort, Insertion Sort khi gán đè giá trị
// Thêm vào helper.js
function getValue(bar) {
  const label = bar.querySelector(".bar-label");
  return label ? parseInt(label.innerText) : 0;
}

/// cập nhật giá trị cột khi đổi
function updateBar(bar, newValue) {
  // 1. Cập nhật chiều cao để mắt người thấy
  bar.style.height = `${newValue * 3}px`;

  // 2. CẬP NHẬT GIÁ TRỊ THỰC
  const label = bar.querySelector(".bar-label");
  if (label) {
    label.innerText = newValue;
  }
}

function setColor(b, color) {
  b.style.backgroundColor = color;
}



// ==========================
//  BUBBLE SORT
// ==========================
async function bubbleSort(bars) {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setColor(bars[j], "orange");
      setColor(bars[j + 1], "orange");

      await wait(delay);

      if (getValue(bars[j]) > getValue(bars[j + 1])) {
        swap(bars[j], bars[j + 1]);
        setColor(bars[j], "red");
        setColor(bars[j + 1], "red");
        await wait(delay);
      }

      setColor(bars[j], "lightseagreen");
      setColor(bars[j + 1], "lightseagreen");
    }
    setColor(bars[n - i - 1], "green");
  }
  setColor(bars[0], "green");
}

// ==========================
//  SELECTION SORT
// ==========================
async function selectionSort(bars) {
  let n = bars.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    setColor(bars[i], "orange");

    for (let j = i + 1; j < n; j++) {
      setColor(bars[j], "orange");
      await wait(delay);

      if (getValue(bars[j]) < getValue(bars[minIdx])) {
        setColor(bars[minIdx], "lightseagreen");
        minIdx = j;
      } else {
        setColor(bars[j], "lightseagreen");
      }
      await wait(delay);
    }

    if (minIdx !== i) {
      swap(bars[i], bars[minIdx]);
      setColor(bars[i], "red");
      setColor(bars[minIdx], "red");
      await wait(delay);
    }

    setColor(bars[i], "green");
  }
}
// ==========================
//  INSERTION SORT
// ==========================
async function insertionSort(bars) {
  let n = bars.length;
  for (let i = 1; i < n; i++) {
    let key = getValue(bars[i]);
    setColor(bars[i], "orange");
    let j = i - 1;

    while (j >= 0 && getValue(bars[j]) > key) {
      setColor(bars[j], "yellow");
      await wait(delay);

      bars[j + 1].style.height = bars[j].style.height;

      setColor(bars[j], "cyan");
      j--;
    }
    bars[j + 1].style.height = key * 3 + "px";
    setColor(bars[i], "cyan");
  }

  for (let i = 0; i < n; i++) {
    setColor(bars[i], "lightgreen");
  }
}

// ==========================
//  QUICK SORT
// ==========================
async function quickSort(bars, low, high) {
  if (low < high) {
    let pivotIndex = await partition(bars, low, high);
    await quickSort(bars, low, pivotIndex - 1);
    await quickSort(bars, pivotIndex + 1, high);
  }
}

async function partition(bars, low, high) {
  let pivot = getValue(bars[high]);
  setColor(bars[high], "orange");

  let i = low - 1;
  for (let j = low; j < high; j++) {
    setColor(bars[j], "yellow");
    await wait(delay);

    if (getValue(bars[j]) < pivot) {
      i++;
      swap(bars[i], bars[j]);
    }
    setColor(bars[j], "cyan");
  }

  swap(bars[i + 1], bars[high]);
  setColor(bars[high], "cyan");
  return i + 1;
}

// ==========================
//  MERGE SORT
// ==========================
async function mergeSort(bars, l, r) {
  if (l >= r) return;

  let mid = Math.floor((l + r) / 2);
  await mergeSort(bars, l, mid);
  await mergeSort(bars, mid + 1, r);
  await merge(bars, l, mid, r);
}

async function merge(bars, l, m, r) {
  let left = bars.slice(l, m + 1).map((b) => getValue(b));
  let right = bars.slice(m + 1, r + 1).map((b) => getValue(b));

  let i = 0,
    j = 0,
    k = l;

  while (i < left.length && j < right.length) {
    setColor(bars[k], "yellow");
    await wait(delay);

    if (left[i] <= right[j]) {
      bars[k].style.height = left[i] * 3 + "px";
      i++;
    } else {
      bars[k].style.height = right[j] * 3 + "px";
      j++;
    }
    setColor(bars[k], "cyan");
    k++;
  }

  while (i < left.length) {
    bars[k].style.height = left[i] * 3 + "px";
    i++;
    k++;
    await wait(delay);
  }

  while (j < right.length) {
    bars[k].style.height = right[j] * 3 + "px";
    j++;
    k++;
    await wait(delay);
  }

  for (let x = l; x <= r; x++) {
    setColor(bars[x], "lightgreen");
  }
}

// ==========================
//  RADIX SORT
// ==========================
async function radixSort(bars) {
  let maxVal = 0;
  for (let i = 0; i < bars.length; i++) {
    maxVal = Math.max(maxVal, getValue(bars[i]));
  }

  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    await countingSortRadix(bars, exp);
  }

  for (let i = 0; i < bars.length; i++) {
    setColor(bars[i], "lightgreen");
  }
}

async function countingSortRadix(bars, exp) {
  let n = bars.length;
  let output = new Array(n).fill(0);
  let count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    let digit = Math.floor(getValue(bars[i]) / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    let digit = Math.floor(getValue(bars[i]) / exp) % 10;
    output[count[digit] - 1] = getValue(bars[i]);
    count[digit]--;
  }

  for (let i = 0; i < n; i++) {
    setColor(bars[i], "yellow");
    bars[i].style.height = output[i] * 3 + "px";
    await wait(delay);
    setColor(bars[i], "cyan");
  }
}

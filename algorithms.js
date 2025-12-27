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
// 3. INSERTION SORT
// ==========================
async function insertionSort(bars) {
  let n = bars.length;
  for (let i = 1; i < n; i++) {
    let key = getValue(bars[i]);
    let j = i - 1;
    for(let k=0; k<i; k++){
      setColor(bars[k], "green");
    }
    await wait(delay);

    setColor(bars[i], "orange");
    await wait(delay);

    while (j >= 0 && getValue(bars[j]) > key) {
      setColor(bars[j], "orange");
      await wait(delay);

      setColor(bars[j], "red");
      setColor(bars[j+1], "red");
      updateBar(bars[j + 1], getValue(bars[j]));
      await wait(delay);

      setColor(bars[j], "orange")
      setColor(bars[j+1], "green");

      j--;
    }
    updateBar(bars[j + 1], key);
  }
  for (let i = 0; i < n; i++) setColor(bars[i], "green");
}

// ==========================
// 4. QUICK SORT
// ==========================
async function quickSort(bars, low, high) {
  if (low < high) {
    let pivotIndex = await partition(bars, low, high);
    await quickSort(bars, low, pivotIndex - 1);
    await quickSort(bars, pivotIndex + 1, high);
  }
  if (low >= 0 && high < bars.length) {
    for (let i = low; i <= high; i++) setColor(bars[i], "green");
  }
}

async function partition(bars, low, high) {
    let pivotValue = getValue(bars[high]);
    setColor(bars[high], "violet"); 
    await wait(delay);
    
    let i = low - 1;
    for (let j = low; j < high; j++) {
        setColor(bars[j], "orange");
        await wait(delay);

        if (getValue(bars[j]) < pivotValue) {
            i++; // Mở rộng vùng nhỏ hơn
            if(j > i){
              swap(bars[i], bars[j]);
              setColor(bars[i], "red");
              setColor(bars[j], "red");
              await wait(delay);

              setColor(bars[i], "lightseagreen"); 
            }
        } 
        setColor(bars[j], "lightseagreen");
    }
    i++; 
    swap(bars[i], bars[high]);
    setColor(bars[i], "red");
    setColor(bars[high], "red");
    await wait(delay);

    setColor(bars[high], "lightseagreen");
    setColor(bars[i], "green");
    return i;
}

// ==========================
// 5. MERGE SORT
// ==========================
async function mergeSort(bars, l, r) {
  if (l >= r) return;
  let mid = Math.floor((l + r) / 2);
  for(let i = l; i <= mid; i++){
    setColor(bars[i], "yellow");
  }
  for(let i = mid + 1; i <= r ; i++){
    setColor(bars[i], "hotpink");
  }
  await wait(delay);

  for(let i = l; i <= mid; i++){
    setColor(bars[i], "lightseagreen");
  }
  for(let i = mid + 1; i <= r ; i++){
    setColor(bars[i], "lightseagreen");
  }
  await mergeSort(bars, l, mid);
  await mergeSort(bars, mid + 1, r);
  await merge(bars, l, mid, r);
  for(let i = l; i <= r; i++){
    setColor(bars[i], "green");
  }
}

async function merge(bars, l, m, r) {
  for(let i = l; i <= r; i++){
    setColor(bars[i], "blue");
  }
  await wait(delay);

  let leftArr = [], rightArr = [];
  for (let i = 0; i < m - l + 1; i++) leftArr.push(getValue(bars[l + i]));
  for (let j = 0; j < r - m; j++) rightArr.push(getValue(bars[m + 1 + j]));

  let i = 0, j = 0, k = l;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      updateBar(bars[k], leftArr[i]);
      i++;
    } else {
      updateBar(bars[k], rightArr[j]);
      j++;
    }
    setColor(bars[k], "green");
    await wait(delay);
    k++;
  }
  while (i < leftArr.length) {
    updateBar(bars[k], leftArr[i]);
    setColor(bars[k], "green");
    await wait(delay);
    i++;
    k++;
  }
  while (j < rightArr.length) {
    updateBar(bars[k], rightArr[j]);
    setColor(bars[k], "green");
    await wait(delay);
    j++;
    k++;
  }
  for(let i = l; i <= r; i++){
    setColor(bars[i], "lightseagreen");
  }
}

// ==========================
// 6. RADIX SORT
// ==========================
async function radixSort(bars) {
  let max = 0;
  for (let i = 0; i < bars.length; i++) max = Math.max(max, getValue(bars[i]));

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    let n = bars.length;
    let output = new Array(n);
    let count = new Array(10).fill(0);

    for (let i = 0; i < n; i++){
      count[Math.floor(getValue(bars[i]) / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
      setColor(bars[i], "orange");
      await wait(delay);
      let digit = Math.floor(getValue(bars[i]) / exp) % 10;
      output[count[digit] - 1] = getValue(bars[i]);
      count[digit]--;
      setColor(bars[i], "lightseagreen");
    }
    for (let i = 0; i < n; i++) {
      updateBar(bars[i], output[i]);
      setColor(bars[i], "lightseagreen");
    }
    await wait(delay);
  }
  for (let i = 0; i < bars.length; i++) setColor(bars[i], "green");
}

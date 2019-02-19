// 1. 冒泡排序, 每次排一个最大或者最小的数
let arr1 = [5,4,3,2,1,0];

function bubbleSort (arr) {
    if (!arr || arr.length < 2) return;
    const len = arr.length;
    for (let i = len; i >= 1; i--) {
        for (let j = 0; j < i; j++) {
            arr[j] < arr[j - 1] && ([arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]);
        }
    }
}

bubbleSort(arr1);

console.log('冒牌排序', arr1);

// 2. 选择排序，通过遍历得到最小的数
let arr2 = [5,4,3,2,1,0];

function selectSort (arr) {
    if (!arr || arr.length < 2) return;
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            arr[minIndex] > arr[j] && (minIndex = j);
        }
        minIndex !== i && ([arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]);
    }
}

selectSort(arr2);

console.log('选择排序', arr2);

// 3. 归并排序，拆分至最小粒度的有序数组，递归合并有序数组

// 4. 快速排序，
let arr3 = [5,4,3,2,1,0, 3,4,4,1,5,5,5,11];

function quickSort (arr) {
    if (!arr || arr.length < 2) return arr;
    const mid = arr.length >> 1;
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        if (i !== mid) {
            if (val > arr[mid]) {
                right.push(val);
            } else {
                left.push(val);
            }
        }
    }
    return quickSort(left).concat(arr[mid], quickSort(right));
}

// 一行实现快排
function quickSortOneLine (arr) {
    return arr.length <= 1 ? arr : [...quickSortOneLine(arr.slice(1).filter(item => item <= arr[0])), arr[0], ...quickSortOneLine(arr.filter(item => item > arr[0]))]
}

console.log('快速排序', quickSortOneLine(arr3));
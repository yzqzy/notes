class Heap {
  constructor (arr) {
    this.len = arr.length;
    
    for (let i = Math.floor(this.len / 2); i >= 0; i--) {
      this.heapify(arr, i);
    }
  }

  heapify (arr, i) {
    let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < this.len && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < this.len && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest != i) {
      this.swap(arr, i, largest);
      this.heapify(arr, largest);
    }
  }

  swap (arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}


function heapSort (arr) {
  const heap = new Heap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    heap.swap(arr, 0, i);
    heap.len--;
    heap.heapify(arr, 0);
  }
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
heapSort(arr);
console.log(arr);

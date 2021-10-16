function printPerumtations (data, n, k) {
  if (k === 1) {
    for (let i = 0; i < n; i++) {
      console.log(data[i] + " ");
    }
    console.log('---');
  }
  
  for (let i = 0; i < k; i++) {
    let tmp = data[i];
    data[i] = data[k - 1];
    data[k - 1] = tmp;
    
    printPerumtations(data, n, k - 1);
    
    tmp = data[i];
    data[i] = data[k - 1];
    data[k - 1] = tmp;
  }
}

const arr = [1, 2, 3, 4];

printPerumtations(arr, 4, 4);
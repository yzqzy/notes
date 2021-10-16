// const { LinkedList } = require('./LinkedList');

// const list = new LinkedList(['a', 'b', 'c', 'c', 'b', 'a']);

// const head = list.head;

// console.log(isPalindrome(head));

// function isPalindrome (head) {
//   let slow = head,
//       fast = head,
//       prev = null;

//   while (fast != null && fast.next != null) {
//     fast = fast.next.next;

//     const next = slow.next;

//     slow.next = prev;
//     prev = slow;
//     slow = next;
//   }

//   if (fast != null) {
//     slow = slow.next;
//   }

//   while (slow != null) {
//     if (slow.val != prev.val) {
//       return false;
//     }

//     slow = slow.next;
//     prev = prev.next;
//   }

//   return true;
// }

const str = '12345',
      len = str.length;

console.log(find(str, len, 3));

function find (str, n, key) {
  if (str === null || n <= 0) {
    return -1;
  }

  let i = 0;

  while (i < n) {
    if (str[i] == key) {
      return i;
    }
    i++;
  }

  return -1;
}

// function find (str, n, key) {
//   if (str === null || n <= 0) {
//     return -1;
//   }

//   if (str[n - 1] == key) {
//     return n - 1;
//   }

//   const temp = str[n - 1];

//   str[n - 1] = key;

//   let i = 0;

//   while (str[i] != key) {
//     i++;
//   }

//   str[n - 1] = temp;

//   if (i == n - 1) {
//     return -1;
//   } else {
//     return i;
//   }
// } 


// function Node (val) {
//   this.val = val;
//   this.next = null;
// }

// function LinkedList () {
//   this.head = new Node('head');
// }

// LinkedList.prototype.find = function (val) {
//   let currNode = this.head;
  
//   while (currNode.val != val) {
//     currNode = currNode.next;
//   }

//   return currNode;
// }

// LinkedList.prototype.insert = function (newVal, val) {
//   const newNode = new Node(newVal);
//   const current = this.find(val);
//   newNode.next = current.next;
//   current.next = newNode;
// }

// LinkedList.prototype.print = function () {
//   let currNode = this.head;

//   while (currNode.next != null) {
//     console.log(currNode.next.val);
//     currNode = currNode.next;
//   }
// }

// LinkedList.prototype.findPrevious = function (val) {
//   let currNode = this.head;

//   while (currNode.next != null && currNode.next.val != val) {
//     currNode = currNode.next;
//   }

//   return currNode;
// }


// LinkedList.prototype.remove = function (val) {
//   const prevNode = this.findPrevious(val);

//   if (prevNode.next != null) {
//     prevNode.next = prevNode.next.next;
//   }
// }


function Node (val) {
  this.val = val;
  this.next = null;
}

function LinkedList (values) {
  if (values) {
    this.head = new Node(values.shift());
    
    currNode = this.head;

    values.forEach(val => {
      currNode.next = new Node(val);
      currNode = currNode.next;
    });
  }
}

module.exports = {
  LinkedList
}
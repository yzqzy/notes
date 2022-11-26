const { LinkedList } = require('./linked_list')

class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  push(element) {
    this.linkedList.add(element)
  }

  shift() {
    return this.linkedList.remove(0)
  }
}

module.exports = {
  Queue
}

const q = new Queue()

console.log(q)

q.push('node1')
q.push('node2')

console.log(q.shift())
console.log(q.shift())
console.log(q.shift())

console.log('------------------------------')

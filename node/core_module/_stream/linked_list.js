/**
 * 1. node + head + null
 * 2. head -> null
 * 3. size
 * 4. next element
 * 5. add、delete、set、get、clear
 */

class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null
    this.size = 0
  }

  add(index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }

    if (index < 0 || index > this.size) {
      throw new Error('out of bounds')
    }

    if (index == 0) {
      const head = this.head
      this.head = new Node(element, head)
    } else {
      const prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }

    this.size++
  }

  remove(index) {
    if (index === 0) {
      const head = this.head
      this.head = head.next
    } else {
      const prevNode = this._getNode(index - 1)
      prevNode.next = prevNode.next.next
    }

    this.size--
  }

  set(index, element) {
    const node = this._getNode(index)
    node.element = element
  }

  clear() {
    this.head = null
    this.size = 0
  }

  get(index) {
    return this._getNode(index)
  }

  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('out of bounds')
    }

    let currentNode = this.head

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }

    return currentNode
  }
}

// ------------------------

const l1 = new LinkedList()

l1.add('node01')
l1.add('node02')
l1.add(1, 'node3')

// l1.remove(0)
// l1.remove(1)

l1.set(1, 'node3-3')

console.log(l1.get(0))

l1.clear()

console.log(l1)

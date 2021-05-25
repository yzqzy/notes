class Node {
  data = null;
  left = null;
  right = null;

  constructor (data) {
    this.data = data;
  }
}

class BinarySearchTre {
  tree = null;

  find (data) {
    let p = this.tree;

    while (p != null) {
      if (data < p.data) {
        p = p.left;
      } else if (data > p.data) {
        p = p.right;
      } else {
        return p;
      }
    }

    return null;
  }

  insert (data) {
    if (this.tree == undefined) {
      this.tree = new Node(data);
      return;
    }

    let p = this.tree;

    while (p != null) {
      if (data > p.data) {
        if (p.right == null) {
          p.right = new Node(data);
          return;
        }
        p = p.right;
      } else {
        if (p.left == null) {
          p.left = new Node(data);
          return;
        }
        p = p.left;
      }
    }
  }

  delete (data) {
    let p = this.tree;
    let pp = null;
    
    while (p != null && p.data != data) {
      pp = p;
      if (data > p.data) {
        p = p.right
      } else {
        p = p.left;
      }
    }

    if (p == null) return;

    if (p.left != null && p.right != null) {
      let minP = p.right;
      let minPP = p;

      while (minP.left != null) {
        minPP = minP;
        minP = minP.left;
      }

      p.data = minP.data;
      p = minP;
      pp = minPP;
    }

    let child;

    if (p.left != null) {
      child = p.left;
    } else if (p.right != null) {
      child = p.right;
    } else {
      child = null;
    }

    if (pp == null) {
      this.tree = child;
    } else if (pp.left == p) {
      pp.left = child;
    } else {
      pp.right = child;
    }
  }
}
const searchTree = new BinarySearchTre();

searchTree.insert(3);
searchTree.insert(2);
searchTree.insert(1);
searchTree.insert(4);
searchTree.insert(10);
searchTree.insert(5);
searchTree.insert(7);
searchTree.insert(8);

searchTree.delete(1);
searchTree.delete(2);
searchTree.delete(3);
searchTree.delete(4);
searchTree.delete(10);

console.log(searchTree);

const ret = searchTree.find(5);

console.log(ret);


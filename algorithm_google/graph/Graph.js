const { LinkedList } = require('../linked_list/LinkedList');

class Graph {
  v;
  agj;

  constructor (v) {
    this.v = v;
    this.agj = [];

    for (let i = 0; i < v; i++) {
      this.agj[i] = new LinkedList();
    }
  }

  addEdge (s, t) {
    this.agj[s].add(t);
    this.agj[t].add(s);
  }

  bfs (s, t) {
    if (s === t) return;
    
    const visited = {};
    const queue = [];
  
    visited[s] = true;
    queue.push(s);

    const prev = new Array[this.v];

    for (let i = 0; i < this.v; i++) {
      prev[i] = -1;
    }
  
    while (queue.length) {
      const w = queue.shift();
  
      for (let i = 0; i < this.agj[w].length; i++) {
        const q = this.agj[w].get(i);
      }
    }
  }
}

module.exports = {
  Graph
};
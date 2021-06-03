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
    
    const visited = [];
    const queue = new LinkedList();
  
    visited[s] = true;
    queue.add(s);

    const prev = new Array(this.v);

    for (let i = 0; i < this.v; i++) {
      prev[i] = -1;
    }
  
    while (queue.size() != 0) {
      const w = queue.poll(); 

      for (let i = 0; i < this.agj[w].size(); i++) {
        const q = this.agj[w].get(i);

        if (!visited[q]) {
          prev[q] = w;

          if (q === t) {
            this.print(prev, s, t);
            return;
          }

          visited[q] = true;
          queue.add(q);
        }
      }
    }
  }

  found = false;

  dfs (s, t) {
    this.found = false;

    const visited = [];
    const prev = new Array(this.v);

    for (let i = 0; i < this.v; i++) {
      prev[i] = -1;
    }

    this.recurDfs(s, t, visited, prev);
    this.print(prev, s, t);
  }

  recurDfs (w, t, visited, prev) {
    if (this.found === true) return;

    visited[w] = true;

    if (w == t) {
      this.found = true;
      return;
    }

    console.log(w, t);

    for (let i = 0; i < this.agj[w].size(); i++) {
      const q = this.agj[w].get(i);

      if (!visited[q]) {
        prev[q] = w;
        this.recurDfs(q, t, visited, prev);
      }
    }
  }

  print (prev, s, t) {
    if (prev[t] != -1 && t != s) {
      this.print(prev, s, prev[t]);
    }
    
    console.log(t + ' ');
  }
}

module.exports = {
  Graph
};
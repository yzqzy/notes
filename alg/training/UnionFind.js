class UnionFind {
  constructor (n) {
    this.count = n;
    this.parent = new Array(n);

    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find (p) {
    let root = p;

    while (this.parent[root] != root) {
      root = this.parent[root];
    }

    while (this.parent[p] != p) {
      let x = p;
      p = this.parent[p];
      this.parent[x] = root;
    }

    return root;
  }

  union (p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);

    if (rootP === rootQ) return;

    this.parent[rootP] = rootQ;

    this.count--;
  }
}

const unionFind = new UnionFind(10);

unionFind.union(2, 3);
unionFind.union(2, 4);
unionFind.union(2, 5);
unionFind.union(3, 2);
unionFind.union(1, 5);

console.log(unionFind);
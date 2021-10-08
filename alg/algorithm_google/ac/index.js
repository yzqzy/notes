const { LinkedList } = require('../linked_list/LinkedList');

class AcNode {
  data;
  children = new Array(26); // 字符集只包含 a ~ z 这 26 个字符
  isEndingChar = false; // 结尾字符为 true
  length = -1; // isEndingChar 为 true 时，记录模式串长度
  fail; // 失败指针

  constructor (data) {
    this.data = data;
  }
}

class Trie {
  root = new AcNode('/'); // 存储无意义字符

  getCode (val) {
    return val.charCodeAt();
  }

  buildFailurePointer () {
    const queue = new LinkedList();

    this.root.fail = null;

    queue.add(this.root);

    while (!queue.isEmpty()) {
      const p = queue.poll();

      for (let i = 0; i < 26; i++) {
        const pc = p.children[i];

        if (pc == null) continue;
        if (p == this.root) {
          pc.fail = this.root;
        } else {
          const q = p.fail;

          while (q != null) {
            const pc = q.children[getCode(pc.data) - getCode('a')];

            if (qc != null) {
              pc.fail = qc;
              break;
            }

            q = q.fail;
          }

          if (q == null) {
            pc.fail = this.root;
          }
        }

        queue.add(pc);
      }
    }
  }

  match (text) {
    const n = text.length;
    let p = this.root;

    for (let i = 0; i < n; i++) {
      const idx = this.getCode(text[i]) - this.getCode('a');

      while (p.children[idx] == null && p !== this.root) {
        p = p.fail; // 失败指针发挥作用的地方
      }

      p = p.children[idx];

      if (p == null) {
        p = this.root; // 如果没有匹配的，从 root 开始重新匹配
      }

      let tmp = p;

      // 打印出所有可以匹配的模式串
      while (tmp != this.root) {
        if (tmp.isEndingChar) {
          let pos = i - tmp.length + 1;
          console.log("匹配起始下标：" + pos + ";长度：" + tmp.length);
        }

        tmp = tmp.fail;
      }
    }
  }
}


class TrieNode {
  data;
  children = new Array(26);
  isEndingChar = false;

  constructor (data) {
    this.data = data;
  }
}

class Trie {
  root = new TrieNode('/'); // 存储无意义字符

  getCode (val) {
    return val.charCodeAt();
  }

  insert (text) {
    let p = this.root;

    for (let i = 0; i < text.length; i++) {
      const index = this.getCode(text[i]) - this.getCode('a');

      if (p.children[index] == null) {
        const newNode = new TrieNode(text[i]);
        p.children[index] = newNode;
      }

      p = p.children[index];
    }

    p.isEndingChar = true;
  }

  find (pattern) {
    let p = this.root;

    for (let i = 0; i < pattern.length; i++) {
      const index = this.getCode(pattern[i]) - this.getCode('a');

      if (p.children[index] == null) {
        return false;
      }

      p = p.children[index];
    }

    return p.isEndingChar;
  }
}

const trie = new Trie();

trie.insert('b');
trie.insert('bc');

console.log(trie.find('bc'));

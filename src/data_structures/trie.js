class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }
}

class Trie {
  constructor(words, buildCode, Node=TrieNode) {
    this.Node = Node;
    this.buildCode = buildCode;
    this._root = new this.Node();
    this._count = 0; // # of words
    words.forEach(word => this.addWord(word));
  }

  addWord(word) {
    const code = this.buildCode(word);
    let node = this._root;

    for (const radix of code) {
      if (node.children?.[radix] === undefined) {
        node.children[radix] = new this.Node();
      }
      node = node.children[radix];
    }

    if (!node.words.includes(word)) { // don't add duplicates
      node.words.push(word);
      this._count += 1;
    }
  }

  _findNode(code) {
    let node = this._root;

    for (const radix of code) {
      if (node.children?.[radix]) { // if radix for code exists
        node = node.children[radix];
      } else {
        return;
      }
    }
    return node;
  }

  lookupCode(code) {
    const node = this._findNode(code);
    return (node ? node.words: []);
  }

  lookupPrefix(codePrefix) {
    const node = this._findNode(codePrefix);

    const getWords = (node, words=[]) => {
      Object.values(node.children).forEach(function(childNode) {
        words = getWords(childNode, words);
      });
      words.push(...node.words);
      console.log(words);
      return words;
    }

    return (node ? getWords(node): []);
  }

  count() {
    return this._count;
  }
}

export default Trie;

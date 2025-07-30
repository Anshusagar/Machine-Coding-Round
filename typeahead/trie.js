class Node {
    constructor() {
        this.keyToNodeMap = new Map();
        this.isEndOfWord = false;
    }

    hasNode(char) {
        return this.keyToNodeMap.has(char);
    }

    getNode(char) {
        return this.keyToNodeMap.get(char);
    }
    
    createCharNode(char, node) {
        this.keyToNodeMap.set(char, node);
    }
    
    setEndOfWord() {
        this.isEndOfWord = true;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    // insert a word into the trie
    insert(word) {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.hasNode(char)) {
                currentNode.keyToNodeMap.set(char, new Node());
            }
            currentNode = currentNode.getNode(char);
        }
        currentNode.setEndOfWord();
    }

    search(word) {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.hasNode(char)) {
                return false;
            }
            currentNode = currentNode.getNode(char);
        }
        return currentNode.isEndOfWord;
    }

    recursiveSearch(word, index = 0, node = null) {
        if (node === null) {
            node = this.root;
        }

        if (index === word.length) {
            return node.isEndOfWord;
        }

        const char = word[index];
        if (!node.hasNode(char)) {
            return false;
        }

        return this.recursiveSearch(word, index + 1, node.getNode(char));
    }

    // Get all words that start with the given prefix
    getWordsWithPrefix(prefix) {
        const words = [];
        let currentNode = this.root;

        // Navigate to the end of the prefix
        for (const char of prefix) {
            if (!currentNode.hasNode(char)) {
                return words; // No words with this prefix
            }
            currentNode = currentNode.getNode(char);
        }

        // Collect all words from this node
        this.collectWords(currentNode, prefix, words);
        return words;
    }

    collectWords(node, currentWord, words) {
        if (node.isEndOfWord) {
            words.push(currentWord);
        }

        for (const [char, childNode] of node.keyToNodeMap) {
            this.collectWords(childNode, currentWord + char, words);
        }
    }
} 
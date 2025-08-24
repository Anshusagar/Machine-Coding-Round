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

}
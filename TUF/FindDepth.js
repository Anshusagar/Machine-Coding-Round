class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// Find the depth of a binary tree using recursion
function findDepth(root) {
    if (!root) return 0;
    let leftDepth = findDepth(root.left);
    let rightDepth = findDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
}
// Find the depth of a binary tree using iteration
function findDepth(root) {
    if (!root) return 0;
    let depth = 0;
    let queue = [root];
    while (queue.length > 0) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        depth++;
    }
    return depth;
}

// Test the functions
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
console.log(findDepth(root));
console.log(findDepth(root));


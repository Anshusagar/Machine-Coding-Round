class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function buildTree(arr) {
    if (arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let index = 1;

    while (index < arr.length) {
        const current = queue.shift();
        if (index < arr.length) {
            current.left = new TreeNode(arr[index++]);
            queue.push(current.left);
        }
        if (index < arr.length) {
            current.right = new TreeNode(arr[index++]);
            queue.push(current.right);
        }
    }
    return root;
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(buildTree(arr));

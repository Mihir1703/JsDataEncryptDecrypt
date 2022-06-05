const MinHeap = require('min-heap')

class node {
    left = null;
    right = null;
    constructor(data) {
        this.data = data;
    }
    printData = () => {
        console.log(this.data);
    }
}

const preOrder = (root, ans, k) => {
    if (!root.left) {
        ans.push(k);
        return;
    }
    k += "0";
    preOrder(root.left, ans, k);
    k = k.slice(0, -1);
    k += "1";
    preOrder(root.right, ans, k);
    k = k.slice(0, -1);
}

const encode = (data, string) => {
    let Heap = new MinHeap((r1, r2) => {
        return r1.data - r2.data;
    })
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const element = new node(data[keys[i]]);
        Heap.insert(element);
    }
    while (Heap.size > 1) {
        let node1 = Heap.removeHead();
        let node2 = Heap.removeHead();
        let newNode = new node(node1.data + node2.data);
        newNode.left = node1;
        newNode.right = node2;
        Heap.insert(newNode);
    }
    let ans = []
    const lastNode = Heap.removeHead();
    preOrder(lastNode, ans, "");
    let finalAns = {};
    for (let i = 0; i < ans.length; i++) {
        finalAns[keys[i]] = ans[i];
    }
    const encodedData = finalAns;
    encodedString = "";
    for (let i = 0; i < string.length; i++) {
        encodedString += encodedData[string[i]];
    }
    console.log(encodedString,encodedData);
}

module.exports = encode;
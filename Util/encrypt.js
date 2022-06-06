const MinHeap = require('min-heap')
const CryptoJS = require("crypto-js");

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

const reduceString = (data) => {
    let curr = data[0];
    let count = 1;
    let ans = "";
    for (let i = 1; i < data.length; i++) {
        if (data[i] === curr) {
            count++;
        } else {
            if (count > 1) {
                ans += curr + count;
            } else {
                ans += curr;
            }
            curr = data[i];
            count = 1;
        }
    }
    if (count > 1) {
        ans += curr + count;
    } else {
        ans += curr;
    }
    return ans;
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

function Generate_key() {
    var key = "";
    var hex = "0123456789abcdef";

    for (i = 0; i < 64; i++) {
        key += hex.charAt(Math.floor(Math.random() * 16));
    }
    return key;
}

const encode = (value) => {
    const key = Generate_key();
    let string;
    if (typeof value === "string") {
        string = CryptoJS.AES.encrypt(value, key).toString();
    }else{
        string = CryptoJS.AES.encrypt(JSON.stringify(value), key).toString();
    }
    data = {}
    for (let i = 0; i < string.length; i++) {
        if (data.hasOwnProperty(string[i])) {
            data[string[i]]++;
        } else {
            data[string[i]] = 1;
        }
    }
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
    let encodedData = finalAns;
    encodedString = "";
    for (let i = 0; i < string.length; i++) {
        encodedString += encodedData[string[i]];
    }
    encodedString = reduceString(encodedString);
    encodedString = CryptoJS.AES.encrypt(encodedString, key).toString();
    encodedData = CryptoJS.AES.encrypt(JSON.stringify(encodedData), key).toString();
    let sendData = {
        data: encodedString,
        dataTable: encodedData,
        key: key
    }
    return sendData;
}

module.exports = encode;
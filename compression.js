const fs = require("fs");
const AES = require('./AES.js')
const DataNode = require('./DataNode.js')

function getProbabiltyArray(file) {
    let content = fs.readFileSync(file, "utf-8");
    const map = new Map();
    for (let i=0; i<content.length; i++) {
        let char = content.charAt(i);
        if (map.has(char)) {
            map.set(char, map.get(char)+1);
        }
        else {
            map.set(char, 1);
        }
    }
    let len = content.length;
    const iterator1 = map.keys();

    for (let i=0;i<map.size;i++) {
        let key = iterator1.next().value;
        let v = map.get(key)/len;
        map.set(key, v);
    }
    return map;
}

let heap = new MinHeap();
const map = getProbabiltyArray("Folder/file6.txt");
const iterator1 = map.keys();
let alphaLen = map.size;

for (let i=0; i<alphaLen; i++) {
    let key = iterator1.next().value;
    let prob = map.get(key);
    heap.addNode(key, prob);
}

while(alphaLen > 0) {
    let leftnode = heap.getMinimum();
    if (node.data != null) alphaLen--;
    let rightnode2 = heap.getMinimum();
    if (node2.data != null) alphaLen--;
    
    heap.addNode(null, node.value+node2.value);
}

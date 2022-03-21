const fs = require("fs");
const path = require("path");
const MinHeap = require('./MinHeap.js')

//TODO: multiple line unsuppored right now/support it

class TreeNode {
    constructor(left, right, data) {
        this.left = left;
        this.right = right;
        this.data = data;
    }
}

function getProbabiltyArray(content) {
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

function leftChild(parent) {
    return parent*2;
}

function rightChild(parent) {
    return (parent*2)+1;
}

function binaryToDecimal(binary) {
    let ans = 0;
    let powerValue = 1
    let pad = "00000000"
    if ( binary.length < 8 ) {
        binary += pad;
    }
    for(let i=7; i>=0; i--) {
        if (binary.charAt(i) == "1") ans += powerValue;
        powerValue *= 2;
    }
    return ans;
}

function decimalToBinary(decimal) {
    let binary = [];
    for (let i=0; i<8; i++) binary.push(0);
    let bin = [];
    while(decimal>0) {
        bin.push(decimal%2);
        decimal = decimal/2;
    }
    for (let i=0; i<8; i++) {
        if(i>=bin.length) {}
        else binary[i] = binary[i] | bin[i];
    }
    return binary.reverse().join("");
}

function getActualData(data, tree) {
    //console.log("Binary Data:", data, "Tree:", tree);
    let actualData = [];
    let indx = 0;
    let pointer = 1;
    
    while(indx < data.length) {
        if (data[indx] == 0) { // Go left of tree
            pointer = leftChild(pointer);
            if(tree[pointer].length == 1) {
                actualData.push(tree[pointer]);
                pointer = 1;
            }
        }
        else if (data[indx] == 1) { // Go right
            pointer = rightChild(pointer);
            if(tree[pointer].length == 1) {
                actualData.push(tree[pointer]);
                pointer = 1;
            }
        }
        indx++;
    }
    //console.log("Actual Data:", actualData.join(""));
    return actualData.join("");
}

function store(data, file, metaData) {
    var bytes = data.split(" ");

    var b = Buffer.alloc(bytes.length);
    // console.log(bytes.length);
    for (var i = 0; i < bytes.length;i++) {
        b[i] = bytes[i];
    }

    //fs.writeFileSync(file, b, "binary");

    fullPath = file.split("/");
    filenameWithExt = fullPath[fullPath.length-1].split("."); // List form
    fullFileName = fullPath[fullPath.length-1];
    filePath = fullPath.splice(0, fullPath.length-1).join("/");
    filename = filenameWithExt.splice(0, filenameWithExt.length-1).join(".");

    FolderName = filename.substring(0, 1).toUpperCase()+filename.substring(1, filename.length)+"_compressed";
    folderPath = path.join(filePath, FolderName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    metaFileName = filename+"(meta).txt";
    metaFilePath = path.join(folderPath, metaFileName);
    fs.writeFileSync(metaFilePath, metaData); // Storing Meta data
    finalFilePath = path.join(folderPath, fullFileName);
    fs.writeFileSync(finalFilePath, b, "binary" )
}

function compress(file) {
    let heap = new MinHeap();
    const content = fs.readFileSync(file, "utf-8");
    if (content.split("\n")[0] == "{compress:true}") {
        console.log("Already compressed");
        return;
    }
    const map = getProbabiltyArray(content);
    const iterator1 = map.keys();
    let alphaLen = map.size;

    // Adding node to heap
    for (let i=0; i<alphaLen; i++) {
        let key = iterator1.next().value;
        let prob = map.get(key);
        heap.addNode(key, prob);
    }

    // heap.display();

    // Making Tree (Left will be 0 right will be 1)
    let root = null;
    while(!heap.isEmpty()) {
        let leftnode = heap.getMinimum();
        if(heap.isEmpty()) {
            root = leftnode;
            break;
        }
        let rightnode = heap.getMinimum();
        let node = new TreeNode(leftnode, rightnode, null);
        
        heap.addNode( node, leftnode.value+rightnode.value );
    }

    //TODO: for single character document replace single character by 0's.
    //DataNode.data => treeNode/alphabet 

    // Denoting tree in 2D array.
    let queue = [0, root.data];
    let queuePointer = 1;

    do { // BFS
        let object = queue[queuePointer++];
        //console.log(object, typeof object);
        if (object == null) {
            continue;
        }
        if (typeof object == "string"){
            queue.push(null);
            queue.push(null);
            continue;
        } 
        queue.push(object.left.data);
        queue.push(object.right.data);
    }while(queuePointer!=queue.length)

    for(let i=0; i<queue.length; i++) {
        if (typeof queue[i] != "string") queue[i] =  null;
    }

    // Making HashMap of Sting -> binary
    let l = queue.length;
    let binary = {};
    let bin = [];
    let dfsFunction = function dfs(indx) {
        if(indx>=l) {
            return;
        }
        if (typeof queue[indx] == "string") {
            binary[queue[indx]] = bin.join(""); // to String.
        }
    
        //Go left
        bin.push(0);
        dfs(leftChild(indx));
        bin.pop();
    
        //Go Right
        bin.push(1);
        dfs(rightChild(indx));
        bin.pop();
    }

    dfsFunction( 1 );
    //console.log(binary);

    // Constructin final Integer array to store in file
    let final = [];
    for (let i=0; i<content.length; i++) {
        let char = content.charAt(i);
        final.push(binary[char]);
    }
    let binaryString = final.join("");
    //getActualData(binaryString, queue.join(",").split(","));
    let indx = 0;
    decimalArray = [];
    let length = binaryString.length;
    let extra = length%8;
    let extraBits = binaryString.substring(length-extra); // contains extra bits
    //console.log("Binary String Length:"+ length, "Extra: "+extra);

    while (indx < length-extra) {
        decimalArray.push(binaryToDecimal( binaryString.substring(indx, indx+8) ));
        indx+=8;
    }
    let metaData = "{compress:true}"+"\n"+queue.join(",")+"\n"+extraBits;
    store(decimalArray.join(" "), file, metaData);
}

function readBuffer(file) {
    let bfr = fs.readFileSync(file);
    let content = [];
    for(let i=0;i<bfr.length; i++){
        //console.log(bfr[i]);
        content.push(String.fromCharCode(bfr[i]));
    }
    return content.join("");
}

function decompress(file) {
    
    let metaDataFile = "Folder/File6_compressed/file6(meta).txt";
    const metaData = fs.readFileSync(metaDataFile, "utf-8");
    let phases = metaData.split("\n");
    let tree = phases[1].split(",");
    let extraBits = phases[2];
    let data = readBuffer(file);
    let binaryData = [];
    for (let i=0; i<data.length; i++) {
        binaryData.push(decimalToBinary(data.charCodeAt(i)));
    }
    //getActualData(binaryData.join("")+extraBits, tree);
    fs.writeFileSync(file, getActualData(binaryData.join("")+extraBits, tree));
}

file  = "Folder/file6.txt";
dec = "Folder/File6_compressed/file6.txt"
compress(file);
decompress(dec);
const fs = require("fs");
const path = require("path");
const MinHeap = require('./MinHeap.js');

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
        if (char == ",") continue;
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
            if(tree[pointer].length > 0) {
                actualData.push(tree[pointer]);
                pointer = 1;
            }
        }
        else if (data[indx] == 1) { // Go right
            pointer = rightChild(pointer);
            if(tree[pointer].length > 0) {
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

    fullPath = file.split("/");
    filenameWithExt = fullPath[fullPath.length-1].split("."); // List form
    extension = filenameWithExt[filenameWithExt.length-1];
    fullFileName = fullPath[fullPath.length-1];
    filePath = fullPath.splice(0, fullPath.length-1).join("/");
    filename = filenameWithExt.splice(0, filenameWithExt.length-1).join(".");

    FolderName = filename+"_"+extension+"_compressed";
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
        //console.log(">>", leftnode, rightnode);
        let node = new TreeNode(leftnode, rightnode, null);
        
        heap.addNode( node, leftnode.value+rightnode.value );
    }
    //TODO: for single character document replace single character by 0's.
    //DataNode.data => treeNode/alphabet 

    // Denoting tree in 2D array.
    let queue = [0, root.data];
    let queuePointer = 1;
    counter = 0;
    while (counter < alphaLen) { // BFS
        let object = queue[queuePointer];
        queuePointer += 1;
        if (object == null) {
            queue.push(null);
            queue.push(null);
            continue;
        }
        if (typeof object == "string"){
            counter += 1;
            queue.push(null);
            queue.push(null);
            continue;
        } 
        queue.push(object.left.data);
        queue.push(object.right.data);
    }

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
        if(char == ",") continue; //Skipping Comma
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

function getFileName(folder) {
    // Returns the file name, file path, meta file path.
    fullPath = folder.split("/");
    folderName = fullPath[fullPath.length-1];
    fileNameAndExtensionArray = folderName.split("_");
    filename = fileNameAndExtensionArray.splice(0, fileNameAndExtensionArray.length-2).join("_");
    fileExtension = fileNameAndExtensionArray[0];
    fullFileName = filename+"."+fileExtension;
    filePath = path.join(folder, fullFileName);
    metaFilePath = path.join(folder, filename+"(meta)."+fileExtension);
    return [fullFileName, filePath, metaFilePath]; 
}

function decompress(folder) {
    let fileInArray = getFileName(folder);
    let file = fileInArray[1];
    let metaDataFile = fileInArray[2];
    const metaData = fs.readFileSync(metaDataFile, "utf-8");
    let phases = metaData.split("\n");
    let tree = null;
    if (phases.length > 3) {
        tree = (phases[1]+"\n"+phases[2]).split(",");
    }
    else{
        tree = phases[1].split(",");
    }
    let extraBits = phases[phases.length-1];
    let data = readBuffer(file);
    let binaryData = [];
    for (let i=0; i<data.length; i++) {
        binaryData.push(decimalToBinary(data.charCodeAt(i)));
    }
    fs.writeFileSync(fileInArray[0], getActualData(binaryData.join("")+extraBits, tree));

}

module.exports = {
    compress, decompress
}
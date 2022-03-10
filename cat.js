const fs = require("fs");

//Command Syntax: node cat.js -[option] [filepath]
// OPTIONS
//-r: read
//-s: removes extra spaces between lines
//-n: enumerate
//-b: enumerate except empty lines
//-c: compress(huffman)
//-d: decompress
//-e: encrypt(AES-128)
//-de: decrypt
//-touch: new file

//Combinations
//if -n and -b then -b dominates
//if -s and -n togeather then first run -s then -n.

let command = process.argv; // input from user
// console.log(command);
readCommand(command.splice(2));

function readCommand(command){
    if(command[0] == "-r") {
        // Read the file
        filepaths = command.slice(1);
        for(let i=0; i<filepaths.length; i++){ 
            if (fs.existsSync(filepaths[i])) printContent(filepaths[i]);
            else console.log(`File: ${filepaths[i]} does not exist.`);
        }
    }

    else if(command[0] == "-n") {
        // Enumerate the lines
        filepaths = command.slice(1);
        for(let i=0; i<filepaths.length; i++){ 
            if (fs.existsSync(filepaths[i])) enumerate(filepaths[i]);
            else console.log(`File: ${filepaths[i]} does not exist.`);
        }
    }

    else if(command[0] == "-b") {
        // Enumerate the lines except empty lines
        filepaths = command.slice(1);
        for(let i=0; i<filepaths.length; i++){ 
            if (fs.existsSync(filepaths[i])) enumerate(filepaths[i], space=true);
            else console.log(`File: ${filepaths[i]} does not exist.`);
        }
    }

    else if(command[0] == "-s") {
        // Removes extra space
        filepaths = command.slice(1);
        for(let i=0; i<filepaths.length; i++){ 
            if (fs.existsSync(filepaths[i])) spaceRemover(filepaths[i]);
            else console.log(`File: ${filepaths[i]} does not exist.`);
        }
    }
}

function spaceRemover(filepath) {
    let content = fs.readFileSync(filepath, "utf-8");
    let lines = content.split("\n");
    let indx = 0;

    while(indx < lines.length && lines[indx].trim() == "") indx++; // Removes the starting extra lines

    while(indx < lines.length) {
        if(lines[indx].trim() == ""){
            console.log(lines[indx]);
            while(indx < lines.length && lines[indx].trim() == "") indx++;
        }
        else {
            console.log(lines[indx]);
            indx++;
        }
    }
}

function printContent(filepath) {
    // Prints content of filepath
    console.log(`File: ${filepath}`);
    console.log(fs.readFileSync(filepath, "utf-8"));
}

function enumerate(filepath, space=false) {
    let content = fs.readFileSync(filepath, "utf-8");
    let lines = content.split("\n");
    let number = 1;
    for(i=0; i<lines.length; i++){
        if(space){
            if (lines[i].trim() == "") {
                console.log(lines[i]); // remove this.
                continue;
            }
        }
        console.log(`${number} ${lines[i]}`);
        number += 1;
    }
}
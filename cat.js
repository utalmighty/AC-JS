const fs = require("fs");

// Content of file: node cat.js -[option] [filepath]
// OPTIONS
//-r: read
//-s: removes extra spaces
//-n: enumerate
//-b: enumerate except empty lines
//-c: compress(huffman)
//-d: decompress
//-e: encrypt(playfair)
//-de: decrypt
//-touch: new file 

let command = process.argv; // input from user
// console.log(command);
readCommand(command.splice(2));


function readCommand(command){
    if(command[0] == "-r") {
        // Read the file
        filepaths = command.slice(1);
        printContent(filepaths);
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
}

function printContent(filepaths) {
    // Prints content of filepaths if exists
    for(let i=0; i<filepaths.length; i++){
        if (fs.existsSync(filepaths[i])){ // Checking if Filepath exists or not
            console.log(`File: ${filepaths[i]}`);
            console.log(fs.readFileSync(filepaths[i], "utf-8"));
        }
        else console.log(`File: ${filepaths[i]} does not exist.`);
    }
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
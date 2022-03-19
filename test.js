var fs = require('fs');

var foo = "71%73%70%56%57%97%50%0%50%0%247%0%0%150%140%115%102%94%69%198%187%159%123%114%90%71%71%71%138%129%101%202%193%166%201%193%172%238%234%221%200%197%188%140"
var bytes = foo.split("%");

var b = Buffer.alloc(bytes.length);
//console.log(bytes.length);
for (var i = 0;i < bytes.length;i++) {
    b[i] = bytes[i];
}

fs.writeFileSync("Folder/file7.txt", b,  "binary");

var bfr =fs.readFileSync("Folder/file7.txt");
console.log(bfr);
for(let i=0;i<bfr.length; i++){

    console.log(fromcharcodeAt(bfr[i]);
}
//fs.readFileSync("Folder/file7.txt"); //Hexa

function hexaToDecimal(hexa) {
    let hexaToDecTable = {
        "0" : 0,
        "1" : 1,
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "5" : 5,
        "6" : 6,
        "7" : 7,
        "8" : 8,
        "9" : 9,
        "a" : 10,
        "b" : 11,
        "c" : 12,
        "d" : 13,
        "e" : 14,
        "f" : 15
    } 
    powerValue = 1;
    decimal = 0
    for(let i=hexa.length-1; i>=0; i--){
        decimal += hexaToDecTable[hexa.charAt(i).toLowerCase()]*powerValue;
        powerValue *= 16;
    }
    return decimal;
}

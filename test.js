var fs = require('fs');

var foo = "71%73%70%56%57%97%50%0%50%0%247%0%0%150%140%115%102%94%69%198%187%159%123%114%90%71%71%71%138%129%101%202%193%166%201%193%172%238%234%221%200%197%188%140"
var bytes = foo.split("%");

//var b = Buffer.alloc(bytes.length);
var c = "";
console.log(bytes.length);
for (var i = 0;i < bytes.length;i++) {
    //b[i] = bytes[i];
    c = c + " " + bytes[i]
}

fs.writeFile("Folder/file7.txt", c,  "binary",function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
var fs = require('fs');
const path = require("path");
let file = "C:/Users/utalm/OneDrive/coding'/Pepcoding/CAT/Folder/file6.txt";

fullPath = file.split("/");
filenameWithExtList = fullPath[fullPath.length-1].split(".");
filenameWithExt = fullPath[fullPath.length-1];
filePath = fullPath.splice(0, fullPath.length-1).join("/");
filename = filenameWithExtList.splice(0, filenameWithExtList.length-1).join(".");
console.log(filenameWithExt, filePath, filename);





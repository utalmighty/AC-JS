# Advance CAT commands

## General Syntax:
`node cat [options] [filepaths] [key]`

option to remove big line break (`-s`)<br>
option to add line number to non empty lines (`-b`)<br>
option to add line numbers to all lines (`-n`)<br>
option to encrypt the file (`-e`) (AES-128 bit)<br>
option to decrypt the file (`-de`) (AES-128 bit)<br>
option to compress the file (`-c`)<br>
option to decompress the file (`-d`)<br>
option to create new file (`-touch`)<br>
option to view tree structure of directory (`-tree`)<br>

## Commands:
1- `node cat filepath` => displays content of the file in the terminal 🗄<br>
2- `node cat filepath1 filepath2 filepath3...` => displays content of all files in the terminal in (concatenated form) in the given order. 🗃<br>
3- `node cat -s filepath` => convert big line breaks into a singular line break 📜<br>
4- `node cat -n filepath` => give numbering to all the lines 🔢<br>
5- `node cat -b filepath` => give numbering to non-empty lines 🔢📜<br>
6- `node cat -e filepath key` => encrypt file with Military Grade(AES-128) bit encryption 🔒<br>
7- `node cat -de filepath key` => decrypt file with Military Grade(AES-128) bit encryption 🔓<br>
8- `node cat -c filepath` => Compresses the text based file using Huffman Coding 🗜<br>
9- `node cat -d filepath` => Decompresses file compressed file 🗄<br>
10- `node cat -touch filepath` => Creates new file/folder at the specified path 🆕<br>
11- `node cat -tree filepath` => Draws the path tree 🌳<br>
12- We can mix and match some of the options.

## Edge cases:

1- If file entered is not found then it gives file does not exist error.<br>
2- `-n` and `-b` are 2 options which are mutually exclusive so if user types both of them together only the first enter option should work.<br>
3- `-s` and any or both `-n` and `-b` present then `-s` will be executed first and then `-n` and `-b` according second rule.<br>
4- Advanced options like encryption/decryption can not be mixed matched.<br>
5- For Encryption and decryption 16 character (128 bit) key is required.<br>
6- Compression is done using Huffman coding.<br>
7- Can only decompress file which is compressed using this software only.<br>
8- Touch command can create new folder or files.<br>
9- filepath in tree command is optional.<br>

## Compression:
### Before Compression: ![Before Compression](https://github.com/utalmighty/AC-JS/blob/main/Folder2/Organised_Files/Images/Before.png?raw=true)
`node cat -c Folder/Large.txt`
### After Compression: ![After Compression](https://github.com/utalmighty/AC-JS/blob/main/Folder2/Organised_Files/Images/After.png?raw=true)

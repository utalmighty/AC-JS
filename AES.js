// Advanced Encryption Algorithm

// 10 rounds for 128-bit keys.
// 12 rounds for 192-bit keys.
// 14 rounds for 256-bit keys.

//Plain text XOR key(1) -> subbytes-> shift rows -> Mix Columns-
// ^___________________________________________________________|

function reverse(a, i, j) {
    while(i<j) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
        i += 1;
        j -= 1;
    }
}

function rotate(arr, i) {
    reverse(arr, 0, 3);
    reverse(arr, 0, 3-i);
    reverse(arr, (3-i)+1 ,3);
    
}

function shiftRows(grid) {
    rotate(grid[1], 1);
    rotate(grid[2], 2);
    rotate(grid[3], 3);
}

function makeGrid(a) {
    let grid = [];
    grid.length = 4;
    for(let i=0; i<4; i++){
        grid[i] = [];
        grid[i].length = 4;
        for(let j=0; j<4; j++){
            let indx = (i*4)+j;
            if(indx >= a.length){
                grid[i][j] = 0; // REVIEW IT
            }
            else {
                grid[i][j] = a.charCodeAt(indx); 
                // TODO: if code is > 256 then ignore it because a block in grid constist of a byte
            }
        }
    }
    return grid;
}

a = makeGrid("Hello world papa");
console.log(a);
shiftRows(a);
console.log(a);
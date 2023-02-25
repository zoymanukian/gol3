var side = 30;
var socket = io();

socket.on('send matrix', drawing );

function setup() {
    frameRate(5);
    createCanvas(3000, 3000);
    background('#acacac');
}

function drawing(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("blue");
            } else if (matrix[y][x] == 4) {
                fill("orange");
            } else if (matrix[y][x] == 5) {
                fill("purple");
            }

            rect(x * side, y * side, side, side);

        }
    }
}


var side = 30;
var socket = io();
weath = 'spring';
var btn = document.getElementById('btn'); //spring
var btn1 = document.getElementById('btn1'); //summer
var btn2 = document.getElementById('btn2'); //autumn
var btn3 = document.getElementById('btn3'); // winter

socket.on('send matrix', drawing );

function setup() {
    frameRate(5);
    createCanvas(3000, 3000);
    background('#acacac');
}


btn.addEventListener('click', function onClick() {
    document.body.style.backgroundColor = '#ADFF2F';
    weath = 'spring';
  });
  btn1.addEventListener('click', function onClick2() {
    document.body.style.backgroundColor = '#7FFFD4';
    weath = 'summer';
  });
  btn2.addEventListener('click', function onClick3() {
    document.body.style.backgroundColor = '#FF8C00';
    weath = 'autumn';
  });
  btn3.addEventListener('click', function onClick4() {
    document.body.style.backgroundColor = '#87CEEB';
    weath = 'winter';
  });


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
            }else if (matrix[y][x] == 6) {
                fill("black");
            }

            rect(x * side, y * side, side, side);

        }
    }
}


function Clear() {
  socket.emit("clear")
}
function GrassEater() {
  socket.emit("grassEater")
}
function Predator() {
  socket.emit("predator")
}
function Grass() {
  socket.emit("grass")
}
function Creator() {
  socket.emit("creator")
}
function Fertilizer() {
  socket.emit("fertilizer")
}
function Random() {
  socket.emit("random")
}
function Bomb() {
    socket.emit("bomb")
  }
socket.on('send matrix', drawing);
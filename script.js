function generateMatrix(matLength, gr, grEa, pre, fert, creat) {
    let matrix = [];
    for (let i = 0; i < matLength; i++) {
        matrix.push([])
        for (let j = 0; j < matLength; j++) {
            matrix[i].push(0)
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEa; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 2;
        }
    }

    for (let i = 0; i < pre; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 3;
        }
    }

    for (let i = 0; i < fert; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 4;
        }
    }

    for (let i = 0; i < creat; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 5;
        }
    }



    return matrix;
}
let matrix = generateMatrix(60, 50, 30, 15, 15, 15, 10)
var side = 30;

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let fertilizerArr = [];
let creatorArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let grPredator = new Predator(x, y);
                predatorArr.push(grPredator)
            } else if (matrix[y][x] == 4) {
                let grFertilizer = new Fertilizer(x, y);
                fertilizerArr.push(grFertilizer)
            } else if (matrix[y][x] == 5) {
                let grCreator = new Creator(x, y);
                creatorArr.push(grCreator)
            }
        }
    }
}

function draw() {
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

    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in fertilizerArr) {
        fertilizerArr[i].eat()
    }

    for(let i in creatorArr){
       creatorArr[i].mul()
    }
}


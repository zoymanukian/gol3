var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static("modules"));
app.get('/', function (req, res) {

    res.redirect('index.html');
});

server.listen(3000);


stat = {
    grass: 0,
    grassEater: 0,
    predator: 0,
    creator: 0,
    fertilizer: 0,
    blackhole: 0,
}

grassArr = [];
grassEaterArr = [];
predatorArr = [];
creatorArr = [];
fertilizerArr = [];
energyArr = [];
blackholeArr = [];
matrix = [];

function generateMatrix(matLen, gr, grEat, pr, cre, fer, bh) {

    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < cre; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < fer; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < bh; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }



}

generateMatrix(25, 10, 15, 10, 6, 3, 2)

function createObject() {

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
            } else if (matrix[y][x] == 6) {
                let grBlackhole = new Blackhole(x, y);
                blackholeArr.push(grBlackhole)
            }
        }
    }
}



io.on('connection', function (socket) {

    createObject()
    socket.emit("send matrix", matrix);


});

function game() {

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

    for (let i in creatorArr) {
        creatorArr[i].mul()
    }

    for (let i in blackholeArr) {
        blackholeArr[i].mul()
    }


    io.sockets.emit("send matrix", matrix);
}



setInterval(game, 700)

LivingCreature = require("./modules/living")
Grass = require("./modules/grass")
GrassEater = require("./modules/grassEater")
Predator = require("./modules/predator")
Creator = require('./modules/creator')
Fertilizer = require('./modules/fertilizer')
Blackhole = require('./modules/blackhole')

function Clear() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    creatorArr = [];
    fertilizerArr = [];
    blackholeArr = []

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


function GrassCreator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 1
        grassArr.push(new Grass(x, y));
    }
}

function GrassEaterCreator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 2
        grassEaterArr.push(new GrassEater(x, y));
    }
}


function PredatorCreator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 3
        predatorArr.push(new Predator(x, y));
    }
}

function GrassPredatorCreator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 4
        creatorArr.push(new Creator(x, y));
    }
}


function FertilizerCreator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 5
        fertilizerArr.push(new Fertilizer(x, y));
    }
}

function BlackholeCreator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 6
        bombArr.push(new Blackhole(x, y));
    }
}

function Random() {
    generateMatrix(40, 40, 25, 20, 15, 4, 3, 2)
}

function work() {
    for (var i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    stat.grass = i;

}
for (var i = 0; i < grassEaterArr.length; i++) {
    grassEaterArr[i].eat();
}
stat.grassEater = i;
for (var i = 0; i < predatorArr.length; i++) {
    predatorArr[i].eat();
}
stat.predator = i;
for (var i = 0; i < creatorArr.length; i++) {
    creatorArr[i].mul();
}
stat.creator = i;
for(var i = 0; i < fertilizerArr.length; i++ ){
    fertilizerArr[i].eat();
}
stat.fertilizer = i;
for(var i = 0; i < blackholeArr.length; i++ ){
    blackholeArr[i].mul();
}
stat.blackhole = i;

io.sockets.emit('grass', stat);
io.sockets.emit('send matrix', matrix)




io.on('connection', function (socket) {
    createObject();
    socket.on("grass", GrassCreator);
    socket.on("grassEater", GrassEaterCreator);
    socket.on("creator", GrassPredatorCreator);
    socket.on("predator", PredatorCreator);
    socket.on("fertilizer", FertilizerCreator);
    socket.on("random", Random);
    socket.on("clear", Clear);
    socket.on("blackhole", BlackholeCreator);

});
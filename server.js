var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static("modules"));
app.get('/', function (req, res) {

res.redirect('index.html');
});

server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
creatorArr = [];
fertilizerArr = [];
energyArr = [];
matrix = [];

function generateMatrix(matLen, gr, grEat, pr, cre, fer) {

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
    



}

generateMatrix(25, 10, 15, 10, 6, 3, )

function createObject(){

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



io.on('connection', function (socket) {

    createObject()
    socket.emit("send matrix", matrix);


});

function game(){

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


    io.sockets.emit("send matrix", matrix);
}



setInterval(game, 700)

LivingCreature = require("./modules/living")
Grass = require("./modules/grass")
GrassEater = require("./modules/grassEater")
Predator = require("./modules/predator")
Creator = require('./modules/creator')
Fertilizer = require('./modules/fertilizer')
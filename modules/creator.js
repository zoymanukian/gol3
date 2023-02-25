var LivingCreature = require("./living");
module.exports = class Creator extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy = 4;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }



    random(emptyCells) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }



    mul() {
        let count = Math.round(this.random(5))
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        console.log(emptyCells, newCell);
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            if (count == 1) {
                matrix[this.y][this.x] = 1;
                let gr = new Grass(this.x, this.y)
                grassArr.push(gr)
            }
            // else if (count == 2){
            //     matrix[this.y][this.x] = 2;
            //     let grEa = new GrassEater (this.x, this.y)
            //     grassEaterArr.push(grEa)
            // }
            else if (count == 3) {
                matrix[this.y][this.x] = 3;
                let pre = new Predator(this.x, this.y)
                predatorArr.push(pre)
            }
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = 5
        }
        if (this.energy = 0) {
            this.die
        }
    }
    move() {
        this.energy++
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in creatorArr) {
            if (this.x == creatorArr[i].x && this.y == creatorArr[i].y) {
                creatorArr.splice(i, 1);
                break;
            }
        }
    }
}

class Creator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 4;
        this.directions = [];
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        let count = Math.round(random(5))
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        console.log(emptyCells, newCell);
        if (newCell ) { 
            let newX = newCell[0];
            let newY = newCell[1];
            if(count  == 1){
                matrix[this.y][this.x] = 1;
                let gr = new Grass(this.x, this.y)
                grassArr.push(gr)
            }
            // else if (count == 2){
            //     matrix[this.y][this.x] = 2;
            //     let grEa = new GrassEater (this.x, this.y)
            //     grassEaterArr.push(grEa)
            // }
            else if (count == 3){
                matrix[this.y][this.x] = 3;
                let pre = new Predator (this.x, this.y)
                predatorArr.push(pre)
            }
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = 5
        }
        if(this.energy = 0){
            this.die
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
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
              CreatorArr.splice(i, 1); 
                break;
            }
        }
    }
}

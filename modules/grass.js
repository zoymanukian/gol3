var LivingCreature = require("./living");
module.exports = class Grass extends LivingCreature {

    random(emptyCells) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        console.log(emptyCells, newCell);
        if (newCell && this.multiply >= 4) { 
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}
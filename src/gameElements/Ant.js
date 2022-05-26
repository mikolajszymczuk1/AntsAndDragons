import Base from "./Base";

// Ant character class
class Ant extends Base {
    constructor(health, name, x, y) {
        super(name, x, y);
        this.health = health;
        this.isMoved = false;
    }

    // Move to next position
    move(board) {
        let neighbors = this.getNeighbors(board, 1);
        let randomWay = neighbors[Base.randomNumber(0, neighbors.length - 1)];
        
        if (board.checkCell(randomWay) !== "empty") return;
        board.moveToAnotherPlace({ x: this.x, y: this.y }, randomWay);
        
        // Update current ant cords
        this.x = randomWay.x;
        this.y = randomWay.y;
    }

    // Show Ant stats
    showStats() {
        console.log(`Health: ${ this.health }`);
        console.log(`PositionX: ${ this.x } | PositionY: ${ this.y }`);
    }
}

export default Ant;

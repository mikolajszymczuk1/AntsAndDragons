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
        let neighbors;
        let randomWay;
        
        neighbors = this.getNeighbors(board, 1);
        if (neighbors.length === 0) return;
        randomWay = neighbors[Base.randomNumber(0, neighbors.length - 1)];

        // Actions controller
        for (let i = 0; i < neighbors.length; i++) {
            if (board.checkCell(neighbors[i]) === "food") {  // If found food, eat it
                randomWay = neighbors[i];

                if ((this.health + 20) > 100) this.health = 100;
                else this.health += 20;
                break;

            } else if (board.checkCell(neighbors[i]) === "dragon" || board.checkCell(neighbors[i]) === "ant") {  // If found ant or dragon, go to free place
                let filteredNeighbors = neighbors.filter((el) => 
                    board.checkCell(el) !== "dragon" && board.checkCell(el) !== "ant" && board.checkCell(el) !== "food");
                randomWay = filteredNeighbors[Base.randomNumber(0, filteredNeighbors.length - 1)];
                break;
            }
        }
        
        if (randomWay === undefined) return;
        
        // Reduce HP or kill ant
        if (this.health > 10) {
            this.health -= 10;
        } else {
            board.deleteElement({ x: this.x, y: this.y });
        }

        board.moveToAnotherPlace({ x: this.x, y: this.y }, randomWay);
        
        // Update current ant cords
        this.x = randomWay.x;
        this.y = randomWay.y;
    }

    // Show Ant stats
    getStats() {
        return {
            health: this.health,
            x: this.x,
            y: this.y
        };
    }
}

export default Ant;

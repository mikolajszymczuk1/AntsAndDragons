import Base from "./Base";

// Dragon character class
class Dragon extends Base {
    constructor(health, name, x, y) {
        super(name, x, y);
        this.health = health;
        this.isMoved = false;
    }

    // Move to next position
    move(board) {
        let neighbors;
        let allNeighbors;
        let toSubtractNeighbors;
        let randomWay;
        
        allNeighbors = this.getNeighbors(board, 2);
        toSubtractNeighbors = this.getNeighbors(board, 1);

        // Create moving area for dragon
        neighbors = allNeighbors.filter((n) => {
            for (let i = 0; i < toSubtractNeighbors.length; i++) {
                if (toSubtractNeighbors[i].x === n.x && toSubtractNeighbors[i].y === n.y) {
                    return false;
                }
            }

            return true;
        });

        if (neighbors.length === 0) return;
        randomWay = neighbors[Base.randomNumber(0, neighbors.length - 1)];

        // Actions controller
        for (let i = 0; i < neighbors.length; i++) {
            if (board.checkCell(neighbors[i]) === "ant") {
                randomWay = neighbors[i];

                if ((this.health + board.getElement(neighbors[i]).health) > 200) this.health = 200;
                else this.health += board.getElement(neighbors[i]).health;
                break;

            } else if (board.checkCell(neighbors[i]) === "food" || board.checkCell(neighbors[i]) === "dragon") {
                let filteredNeighbors = neighbors.filter((el) =>
                    board.checkCell(el) !== "dragon" && board.checkCell(el) !== "food" && board.checkCell(el) !== "ant");
                randomWay = filteredNeighbors[Base.randomNumber(0, filteredNeighbors.length - 1)];
                break;
            }
        }

        if (randomWay === undefined) return;

        // Reduce HP or kill dragon
        if (this.health > 10) {
            this.health -= 10;
        } else {
            board.deleteElement({ x: this.x, y: this.y });
        }

        board.moveToAnotherPlace({ x: this.x, y: this.y }, randomWay);

        // Update current dragon cords
        this.x = randomWay.x;
        this.y = randomWay.y;
    }

    // Show Dragon stats
    showStats() {
        console.log(`Health: ${ this.health }`);
        console.log(`PositionX: ${ this.x } | PositionY: ${ this.y }`);
    }
}

export default Dragon;

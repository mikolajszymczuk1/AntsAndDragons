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

                // If ant found food, send message
                this.sendMsg(board, "Food found !", randomWay.x, randomWay.y);
                break;

            } else if (board.checkCell(neighbors[i]) === "dragon" || board.checkCell(neighbors[i]) === "ant") {  // If found ant or dragon, go to free place
                let filteredNeighbors = neighbors.filter((el) => 
                    board.checkCell(el) !== "dragon" && board.checkCell(el) !== "ant" && board.checkCell(el) !== "food");
                randomWay = filteredNeighbors[Base.randomNumber(0, filteredNeighbors.length - 1)];

                // If ant found dragon, send message
                if (board.checkCell(neighbors[i]) === "dragon") {
                    this.sendMsg(board, "Dragon is here !", neighbors[i].x, neighbors[i].y);
                }

                break;
            }
        }
        
        if (randomWay === undefined) return;
        
        // Reduce HP or kill ant
        if (this.health > 10) {
            this.health -= 10;
        } else {
            this.sendMsg(board, "Ant died !");
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

    // Send event message
    sendMsg(board, msgTitle, posX = this.x, posY = this.y) {
        let msg = {
            title: msgTitle,
            data: {
                x: posX,
                y: posY
            }
        };
        
        board.addEventMsg(msg);
    }
}

export default Ant;

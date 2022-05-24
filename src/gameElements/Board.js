import Ant from "./Ant";
import Dragon from "./Dragon";
import Food from "./Food";

// Game board class
class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
    }

    // Generate empty board
    createBoard() {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(" ");
            }

            this.board.push(row);
        }
    }

    // Return board array
    getBoard() {
        return this.board;
    }

    // Place on board Ant or Dragon or Food
    placeGameElement(x, y) {
        if (this.board[y][x] === " ") {
            this.board[y][x] = new Ant(100);
        } else if (this.board[y][x].getClassName() === "Ant") {
            this.board[y][x] = new Dragon(200);
        } else if (this.board[y][x].getClassName() === "Dragon") {
            this.board[y][x] = new Food();
        } else {
            this.board[y][x] = " ";
        }
    }
}

export default Board;

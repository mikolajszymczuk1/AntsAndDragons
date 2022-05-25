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
            this.board[y][x] = new Ant(100, "Ant");
        } else if (this.board[y][x].getName() === "Ant") {
            this.board[y][x] = new Dragon(200, "Dragon");
        } else if (this.board[y][x].getName() === "Dragon") {
            this.board[y][x] = new Food("Food");
        } else {
            this.board[y][x] = " ";
        }
    }

    // Clear board (make all cells empty)
    clearBoard() {
        for (let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                this.board[i][j] = " ";
            }
        }
    }
}

export default Board;

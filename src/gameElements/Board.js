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
}

export default Board;

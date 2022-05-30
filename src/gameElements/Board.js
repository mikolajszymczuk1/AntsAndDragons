import Ant from "./Ant";
import Dragon from "./Dragon";
import Food from "./Food";

// Game board class
class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
        this.boardEvents = [];
        this.eventId = 0;
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

    // Return size of board
    getSize() {
        return this.size;
    }

    // Return events list
    getEvents() {
        return this.boardEvents;
    }

    // Return element with position 'position'
    getElement(position) {
        return this.board[position.y][position.x];
    }

    // Place on board Ant or Dragon or Food
    placeGameElement(x, y) {
        switch(this.checkCell({ x: x, y: y })) {
            case "empty":
                this.board[y][x] = new Ant(100, "Ant", x, y);
                break;
            case "ant":
                this.board[y][x] = new Dragon(200, "Dragon", x, y);
                break;
            case "dragon":
                this.board[y][x] = new Food("Food", x, y);
                break;
            case "food":
                this.board[y][x] = " ";
                break;
        }
    }

    // Clear board (make all cells empty)
    clearBoard() {
        for (let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                this.board[i][j] = " ";
            }
        }

        this.eventId = 0;
        this.boardEvents = [];
    }

    // Do next move on board
    nextMove() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (!this.isItAntOrDragon({ x: j, y: i })) continue;
                if (this.board[i][j].isMoved) continue;
                this.board[i][j].isMoved = true;
                this.board[i][j].move(this);
            }
        }

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (!this.isItAntOrDragon({ x: j, y: i })) continue;
                this.board[i][j].isMoved = false;
            }
        }
    }

    // Count all game elements and return them
    countElements() {
        let [ a, d, f ] = [0, 0, 0];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let position = { x: j, y: i };
                if (this.checkCell(position) === "ant") a++;
                else if (this.checkCell(position) === "dragon") d++;
                else if (this.checkCell(position) === "food") f++;
            }
        }

        return { ants: a, dragons: d, food: f };
    }

    // Show element stats (Ant or Dragon)
    getElementStats(position) {
        if (!this.isItAntOrDragon(position)) return { health: 0, x: 0, y: 0 };
        return this.board[position.y][position.x].getStats();
    }

    // Move element to another place
    moveToAnotherPlace(posA, posB) {
        this.board[posB.y][posB.x] = this.board[posA.y][posA.x];
        this.board[posA.y][posA.x] = " ";
    }

    // Return true if cell is Ant or Dragon
    isItAntOrDragon(position) {
        if (this.checkCell(position) === "empty" || this.checkCell(position) === "food") return false;
        return true;
    }

    // Simple method return 'empty' if cell is empty or one of 3 game characters: 'food', 'ant', 'dragon'
    checkCell(position) {
        if (this.board[position.y][position.x] === " ") return "empty";
        else if (this.board[position.y][position.x].getName() === "Food") return "food";
        else if (this.board[position.y][position.x].getName() === "Ant") return "ant";
        else return "dragon";
    }

    // Delete element from game board
    deleteElement(position) {
        this.board[position.y][position.x] = " ";
    }

    // Add new event object to list of events
    addEventMsg(msgEvent) {
        this.boardEvents.unshift({ id: this.eventId, event: msgEvent });
        this.eventId++;
    }
}

export default Board;

// Base class with basic game elements functionality
class Base {
    constructor(name, x, y) {
        this._name = name;
        this.x = x;
        this.y = y;
    }

    // Return random number from range (min, max) (min, max included)
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Return class name
    getName() {
        return this._name
    }

    // Return all possible neighbors around Ant
    getNeighbors(board, n) {
        let neighbors = [];
        let a = { x: (this.x - n), y: (this.y - n) };
        let b = { x: (this.x + n), y: (this.y + n) };        

        for (let i = a.y; i < (b.y + 1); i++) {
            for (let j = a.x; j < (b.x + 1); j++) {
                if (i < 0 || i > board.getSize() - 1) continue;
                if (j < 0 || j > board.getSize() - 1) continue;
                if (j === this.x && i === this.y) continue;
                neighbors.push({ x: j, y: i });
            }
        }

        return neighbors;
    }
}

export default Base;

import { describe, it, expect, beforeEach } from "vitest";
import { mockRandom, resetMockRandom } from "jest-mock-random";
import Base from "@/gameElements/Base.js";
import Board from "@/gameElements/Board.js";

let base;
let testSize = 3;

describe("Base.js", () => {
    beforeEach(() => {
        base = new Base("test", parseInt(testSize / 2), parseInt(testSize / 2));
    });

    it("getName should return private _name field", () => {
        expect(base.getName()).toBe("test");
    });

    it("getNeighbors should return all possible neighbors ", () => {
        const board = new Board(3);
        board.createBoard();
        let neighbors = base.getNeighbors(board, 1);
        
        expect(neighbors).toEqual([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 },
            { x: 2, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 }
        ]);

        base = new Base("test", 0, 0);
        neighbors = base.getNeighbors(board, 1);

        expect(neighbors).toEqual([
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ]);
    });

    it("randomNumber should return number in range 'min' 'max'", () => {
        mockRandom([0.5, 0.9, 0.4]);
        
        const min = 0;
        const max = 3;
        const result = [
            Base.randomNumber(min, max),
            Base.randomNumber(min, max),
            Base.randomNumber(min, max)
        ];
        
        expect(result).toEqual([2, 3, 1]);
        result.forEach((el) => {
            expect(el).toBeGreaterThanOrEqual(min);
            expect(el).toBeLessThanOrEqual(max);
        });
        
        resetMockRandom();
    });
});

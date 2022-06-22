import { describe, it, expect, beforeEach } from "vitest";
import { mockRandom, resetMockRandom } from "jest-mock-random";
import Dragon from "@/gameElements/Dragon.js";
import Board from "@/gameElements/Board.js";

describe("Dragon.js", () => {
    it("getStatsShould return all dragon' stats", () => {
        const dragon = new Dragon(200, "Dragon", 0, 0);
        expect(dragon.getStats()).toEqual({
            health: 200,
            x: 0,
            y: 0
        });
    });

    describe("Move method", () => {
        let board;
        
        beforeEach(() => {
            board = new Board(4);
            board.createBoard();
        });

        it("When no ants around, go to random place around", () => {
            mockRandom([0.5]);
            [0, 1].forEach(() => board.placeGameElement(1, 1));

            expect(board.getElementStats({ x: 1, y: 1 })).toEqual({
                health: 200,
                x: 1, y: 1
            });

            board.nextMove();

            expect(board.getElementStats({ x: 0, y: 3 })).toEqual({
                health: 190,
                x: 0, y: 3
            });

            resetMockRandom();
        });

        it("When dragon sees ant, it eats them", () => {
            [0, 1].forEach(() => board.placeGameElement(0, 0));

            // Put ant(food) on board
            board.placeGameElement(2, 2);
            
            expect(board.getElementStats({ x: 0, y: 0 })).toEqual({
                health: 200,
                x: 0, y: 0
            });

            board.nextMove();

            expect(board.getElementStats({ x: 2, y: 2 })).toEqual({
                health: 190,
                x: 2, y: 2 
            });
        });

        it("If dragon's hp is equal 0, dragon die", () => {
            [0, 1].forEach(() => board.placeGameElement(0, 0));
            Array(20).fill(0).forEach(() => board.nextMove());

            for (let i = 0; i < board.getSize(); i++) {
                for (let j = 0; j < board.getSize(); j++) {
                    expect(board.getElement({ x: j, y: i })).toBe(" ");
                }
            }
        });

        it("If dragon found, go to free place", () => {
            mockRandom([0.75]);
            [0, 1].forEach(() => board.placeGameElement(0, 0));
            [0, 1].forEach(() => board.placeGameElement(2, 0));
            [0, 1].forEach(() => board.placeGameElement(2, 1));
            [0, 1].forEach(() => board.placeGameElement(2, 2));
            [0, 1].forEach(() => board.placeGameElement(1, 2));

            expect(board.getElementStats({ x: 0, y: 0 })).toEqual({
                health: 200, x: 0, y: 0
            });

            board.nextMove();

            expect(board.getElementStats({ x: 0, y: 2 })).toEqual({
                health: 190, x: 0, y: 2
            });

            expect(board.checkCell({ x: 0, y: 2 })).toBe("dragon");

            resetMockRandom();
        });
    });
});

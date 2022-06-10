import { describe, it, expect, beforeEach } from "vitest";
import { mockRandom, resetMockRandom } from "jest-mock-random";
import Ant from "@/gameElements/Ant.js";
import Board from "@/gameElements/Board.js";

describe("Ant.js", () => {
    it("getStats should return all ant' stats", () => {
        const ant = new Ant(100, "Ant", 0, 3);
        expect(ant.getStats()).toEqual({
            health: 100,
            x: 0,
            y: 3
        });
    });

    describe("Move method", () => {
        let board;
        
        beforeEach(() => {
            board = new Board(4);
            board.createBoard();
        });

        it("When no food and dragons around, go to random place around", () => {
            mockRandom([0.5]);
            board.placeGameElement(1, 1);

            expect(board.getElementStats({ x: 1, y: 1 })).toEqual({
                health: 100,
                x: 1, y: 1
            });

            board.nextMove();

            expect(board.getElementStats({ x: 2, y: 1 })).toEqual({
                health: 90,
                x: 2, y: 1
            });

            resetMockRandom();
        });

        it("When ant sees food, it eats them", () => {
            board.placeGameElement(2, 1);

            // Put food on board
            [1, 2, 3].forEach(() => board.placeGameElement(3, 1));
            [1, 2, 3].forEach(() => board.placeGameElement(3, 2));
            
            expect(board.getElementStats({ x: 2, y: 1 })).toEqual({
                health: 100,
                x: 2, y: 1
            });

            board.nextMove();

            expect(board.getElementStats({ x: 3, y: 1 })).toEqual({
                health: 90,
                x: 3, y: 1 
            });

            board.nextMove();

            expect(board.getElementStats({ x: 3, y: 2 })).toEqual({
                health: 90,
                x: 3, y: 2 
            });
        });

        it("If ant's hp is equal 0, ant die", () => {
            board.placeGameElement(0, 0);
            Array(10).fill(0).forEach(() => board.nextMove());

            for (let i = 0; i < board.getSize(); i++) {
                for (let j = 0; j < board.getSize(); j++) {
                    expect(board.getElement({ x: j, y: i })).toBe(" ");
                }
            }
        });

        it("If ant found dragon, go to free place", () => {
            mockRandom([0.75]);
            board.placeGameElement(0, 0);
            [0, 1].forEach(() => board.placeGameElement(1, 0));
            [0, 1].forEach(() => board.placeGameElement(1, 1));

            expect(board.getElementStats({ x: 0, y: 0 })).toEqual({
                health: 100, x: 0, y: 0
            });

            board.nextMove();

            expect(board.getElementStats({ x: 0, y: 1 })).toEqual({
                health: 90, x: 0, y: 1
            });

            expect(board.checkCell({ x: 0, y: 1 })).toBe("ant");

            resetMockRandom();
        });

        it("If ant found ant, go to free place", () => {
            mockRandom([0.75]);
            board.placeGameElement(0, 0);
            board.placeGameElement(1, 0);
            board.placeGameElement(1, 1);

            expect(board.getElementStats({ x: 0, y: 0 })).toEqual({
                health: 100, x: 0, y: 0
            });

            board.nextMove();

            expect(board.getElementStats({ x: 0, y: 1 })).toEqual({
                health: 90, x: 0, y: 1
            });

            expect(board.checkCell({ x: 0, y: 1 })).toBe("ant");

            resetMockRandom();
        });
    });
});

import { describe, it, expect, beforeEach } from "vitest";
import Board from "@/gameElements/Board.js";
import Ant from "@/gameElements/Ant.js";
import Dragon from "@/gameElements/Dragon.js";
import Food from "@/gameElements/Food.js";

let board;
let testSize = 4;

describe("Board.js", () => {
    beforeEach(() => {
        board = new Board(testSize);
        board.createBoard();
    });

    it("Board object should has correct init values", () => {
        expect(board.size).toBe(testSize);
        expect(board.boardEvents).toEqual([]);
        expect(board.eventId).toBe(0);
    });

    it("createBoard method should generate empty 2D array n x n", () => {
        let b = board.getBoard();
        expect(b.length).toBe(testSize);
        expect(b[0].length).toBe(testSize);
        
        for (let i = 0; i < testSize; i++) {
            for (let j = 0; j < testSize; j++) {
                expect(b[i][j]).toBe(" ");
            }
        }
    });

    describe("Board getters", () => {
        it("getBoard should return game board 2D array", () => {
            let b = board.getBoard();
            expect(b.length).toBe(testSize);
            expect(b[0].length).toBe(testSize);
            
            for (let i = 0; i < testSize; i++) {
                for (let j = 0; j < testSize; j++) {
                    expect(b[i][j]).toBe(" ");
                }
            }
        });
    
        it("getSize should return game board size", () => {
            expect(board.getSize()).toBe(testSize);
        });
    
        it("getEvents should return game events list", () => {
            expect(board.getEvents()).toEqual([]);
        });
    
        it("getElement should return element on position (x, y)", () => {
            const testPosition = { x: 2, y: 2 };
            expect(board.getElement(testPosition)).toBe(" ");
            board.placeGameElement(testPosition.x, testPosition.y);
            expect(board.getElement(testPosition)).toBeInstanceOf(Ant);
        });
    
        it("getElementStats should return element's health and position", () => {
            const testPosition = { x: 1, y: 3 };
            expect(board.getElementStats(testPosition)).toEqual({
                health: 0,
                x: 0,
                y: 0
            });

            board.placeGameElement(testPosition.x, testPosition.y);
            expect(board.getElementStats(testPosition)).toEqual({
                health: 100,
                x: 1,
                y: 3
            });
        });
    });

    it("placeGameElement should correctly place elements on game board", () => {
        const testPosition = { x: 1, y: 3 };
        expect(board.getElement(testPosition)).toBe(" ");
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.getElement(testPosition)).toBeInstanceOf(Ant);
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.getElement(testPosition)).toBeInstanceOf(Dragon);
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.getElement(testPosition)).toBeInstanceOf(Food);
    });

    it("clearBoard should reset all board and set default values for properties", () => {
        const testPosition = { x: 3, y: 2 };
        const testEvent = {
            title: "test",
            data: {
                x: testPosition.x,
                y: testPosition.y
            }
        };

        board.placeGameElement(testPosition.x, testPosition.y);
        board.addEventMsg(testEvent);

        expect(board.getElement(testPosition)).toBeInstanceOf(Ant);
        expect(board.eventId).toBe(1);
        expect(board.getEvents().length).toBe(1);

        board.clearBoard();

        expect(board.getElement(testPosition)).toBe(" ");
        expect(board.eventId).toBe(0);
        expect(board.getEvents().length).toBe(0);
    });

    it("countElements should correctly count all elements on board", () => {
        board.placeGameElement(2, 2);
        board.placeGameElement(1, 2);
        board.placeGameElement(3, 3);
        board.placeGameElement(3, 3);

        expect(board.countElements()).toEqual({
            ants: 2,
            dragons: 1,
            food: 0
        });
    });

    it("moveToAnotherPlace should change position of game element on board", () => {
        const testPositionA = { x: 0, y: 0};
        const testPositionB = { x: 3, y: 3 };
        
        board.placeGameElement(testPositionA.x, testPositionA.y);
        expect(board.getElement(testPositionA)).toBeInstanceOf(Ant);
        expect(board.getElement(testPositionB)).toBe(" ");
        board.moveToAnotherPlace(testPositionA, testPositionB);
        expect(board.getElement(testPositionA)).toBe(" ");
        expect(board.getElement(testPositionB)).toBeInstanceOf(Ant);
    });

    it("isItAntOrDragon should return true only if dragon or ant is in the cell", () => {
        const testPosition = { x: 2, y: 2 };
        expect(board.isItAntOrDragon(testPosition)).toBeFalsy();
        [1, 2, 3].forEach(() => board.placeGameElement(testPosition.x, testPosition.y));
        expect(board.isItAntOrDragon(testPosition)).toBeFalsy();
        [1, 2].forEach(() => board.placeGameElement(testPosition.x, testPosition.y));
        expect(board.isItAntOrDragon(testPosition)).toBeTruthy();
    });

    it("checkCell should return string that inform what is in the cell", () => {
        const testPosition = { x: 0, y: 0 };
        expect(board.checkCell(testPosition)).toBe("empty");
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.checkCell(testPosition)).toBe("ant");
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.checkCell(testPosition)).toBe("dragon");
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.checkCell(testPosition)).toBe("food");
    });

    it("deleteElement should reset cell with 'position'", () => {
        const testPosition = { x: 1, y: 1 };
        expect(board.getElement(testPosition)).toBe(" ");
        board.placeGameElement(testPosition.x, testPosition.y);
        expect(board.getElement(testPosition)).toBeInstanceOf(Ant);
        board.deleteElement(testPosition);
        expect(board.getElement(testPosition)).toBe(" ");
    });

    it("addEventMsg should add new msg event on the beginning of the events list", () => {
        const testEvent = {
            title: "test",
            data: {
                x: 0,
                y: 0
            }
        };

        expect(board.getEvents().length).toBe(0);
        board.addEventMsg(testEvent);
        expect(board.getEvents().length).toBe(1);
        expect(board.eventId).toBe(1);
        expect(board.getEvents()).toEqual([
            {
                id: 0,
                event: {
                    title: "test",
                    data: {
                        x: 0,
                        y: 0
                    }
                }
            }
        ]);
    });
});

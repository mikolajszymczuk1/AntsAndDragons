import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameBoard from "@/components/game/GameBoard.vue";

const board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
];

describe("GameBoard.vue", () => {
    it("Component should correctly render all board", () => {
        const wrapper = mount(GameBoard, {
            props: { boardData: board }
        });

        const colNumber = wrapper.findAll("[data-test=col-number]");
        const rowNumber = wrapper.findAll("[data-test=row-number]");
        const cells = wrapper.findAll("[data-test=cell]");

        expect(colNumber.length).toBe(4);  // n + 1 because on the board there is extra hidden column number
        expect(rowNumber.length).toBe(3);

        colNumber.forEach((el, index) => expect(el.text()).toBe(`${ index }`));
        rowNumber.forEach((el, index) => expect(el.text()).toBe(`${ index + 1 }`));

        expect(cells.length).toBe(9);
        cells.forEach((el) => expect(el.text()).toBe(""));
    });

    it("After click any cell, should emit clicked cell' cords", async () => {
        const wrapper = mount(GameBoard, {
            props: { boardData: board }
        });

        await wrapper.findAll("[data-test=cell]")[4].trigger("click");
        expect(wrapper.emitted("clicked-cell")).toBeTruthy();
        expect(wrapper.emitted("clicked-cell")[0]).toEqual([{ x: 1, y: 1 }]);
    });
});

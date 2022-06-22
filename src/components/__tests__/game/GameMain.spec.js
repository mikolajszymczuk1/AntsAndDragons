import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameMain from "@/components/game/GameMain.vue";
import Board from "@/gameElements/Board";

describe("GameMain.vue", () => {
    it("When component is created, should create new board with size = 8", () => {
        const wrapper = mount(GameMain);
        expect(wrapper.vm.board).toBeInstanceOf(Board);
        expect(wrapper.vm.board.getSize()).toBe(8);
    });

    it("clearGameBoard method should set round value to 0", () => {
        const wrapper = mount(GameMain);
        wrapper.vm.round = 5;
        expect(wrapper.vm.round).toBe(5);
        wrapper.vm.clearGameBoard();
        expect(wrapper.vm.round).toBe(0);
    });

    it("toggleEditMode should toggle editMode value from true to false or from false to true", () => {
        const wrapper = mount(GameMain);
        expect(wrapper.vm.isEditMode).toBeFalsy();
        wrapper.vm.toggleEditMode();
        expect(wrapper.vm.isEditMode).toBeTruthy();
        wrapper.vm.toggleEditMode();
        expect(wrapper.vm.isEditMode).toBeFalsy();
    });

    it("doNextMoveOnBoard should increment round value", () => {
        const wrapper = mount(GameMain);
        expect(wrapper.vm.round).toBe(0);
        wrapper.vm.doNextMoveOnBoard();
        expect(wrapper.vm.round).toBe(1);
    });

    it("changeGameBoardSize should correctly change board size (4 -> 6 -> 8)", () => {
        const wrapper = mount(GameMain);
        wrapper.vm.changeGameBoardSize();
        expect(wrapper.vm.board.getSize()).toBe(4);
        wrapper.vm.changeGameBoardSize();
        expect(wrapper.vm.board.getSize()).toBe(6);
        wrapper.vm.changeGameBoardSize();
        expect(wrapper.vm.board.getSize()).toBe(8);
    });
});

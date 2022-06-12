import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import NavigationBar from "@/components/NavigationBar.vue";

describe("NavigationBar.vue", () => {
    it("By default menu should has active status set to false", () => {
        const wrapper = shallowMount(NavigationBar);
        expect(wrapper.vm.isMenuActive).toBeFalsy();
    });

    it("When menu button is clicked, should activate menu, when close button is clicked, should close menu", async () => {
        const wrapper = shallowMount(NavigationBar);
        expect(wrapper.vm.isMenuActive).toBeFalsy();
        await wrapper.find("[data-test=menu-button]").trigger("click");
        expect(wrapper.vm.isMenuActive).toBeTruthy();
        await wrapper.find("[data-test=close-button]").trigger("click");
        expect(wrapper.vm.isMenuActive).toBeFalsy();
    });
});

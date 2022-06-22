import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameControlButton from "@/components/game/GameControlButton.vue";

describe("GameControlButton.vue", () => {
    it("Button should correctly set slot value", () => {
        const wrapper = mount(GameControlButton, {
            slots: {
                default: "<h2>Hello test</h2>"
            }
        });

        expect(wrapper.find("h2").text()).toBe("Hello test");
    });

    it("After click control button, it should emits 'clicked' event", async () => {
        const wrapper = mount(GameControlButton);
        await wrapper.find("[data-test=control-button]").trigger("click");
        expect(wrapper.emitted("clicked")).toBeTruthy();
    });

    it("Based on props should correctly sets colors for button", () => {
        const wrapper = mount(GameControlButton, {
            props: {
                bgColor: "#355070",
                textColor: "white"
            }
        });

        expect(wrapper.find("[data-test=control-button]").attributes("style"))
            .toBe("background-color: rgb(53, 80, 112); color: white;");
    });
});

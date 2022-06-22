import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavigationLink from "@/components/NavigationLink.vue";

describe("NavigationLink.vue", () => {
    it("Should has correct slot value", () => {
        const wrapper = mount(NavigationLink, {
            props: {
                linkAddress: "#test"
            },
            slots: {
                default: "Test content"
            }
        });

        expect(wrapper.find("a").text()).toBe("Test content");
    });

    it("Should set linkAddress prop value as href attribute", () => {
        const wrapper = mount(NavigationLink, {
            props: {
                linkAddress: "#test"
            },
            slots: {
                default: "Test content"
            }
        });

        expect(wrapper.find("a").attributes("href")).toBe("#test");
    });
});

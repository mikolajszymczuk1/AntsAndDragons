import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import GameStatsEventsPanel from "@/components/game/GameStatsEventsPanel.vue";

describe("GameStatsEventsPanel.vue", () => {
    let statsData
    let elementStatsData
    let eventsList;

    beforeEach(() => {
        statsData = {
            antsCount: 5,
            dragonsCount: 3,
            foodCount: 1
        };

        elementStatsData = {
            health: 100,
            positionX: 2,
            positionY: 2
        };

        eventsList = [
            { id: 0, event: { title: "testTitle0", data: { x: 1, y: 2 } } },
            { id: 1, event: { title: "testTitle1", data: { x: 0, y: 3 } } }
        ];
    });

    it("When views control buttons clicked, should change panel view (stats/events)", async () => {
        const wrapper = mount(GameStatsEventsPanel, {
            props: {
                isActive: true,
                statsData: statsData,
                elementStatsData: elementStatsData,
                eventsList: eventsList
            }
        });

        const controlButtons = wrapper.findAll("[data-test=control-button]");
        
        expect(wrapper.vm.activePanel).toBe("stats");
        await controlButtons[1].trigger("click");
        expect(wrapper.vm.activePanel).toBe("events");
        await controlButtons[0].trigger("click");
        expect(wrapper.vm.activePanel).toBe("stats");
    });

    it("After click exit button, should emit exit event", async () => {
        const wrapper = mount(GameStatsEventsPanel, {
            props: {
                isActive: true,
                statsData: statsData,
                elementStatsData: elementStatsData,
                eventsList: eventsList
            }
        });

        await wrapper.find("[data-test=exit-button]").trigger("click");
        expect(wrapper.emitted("exit-menu")).toBeTruthy();
    });

    it("After click on clear board button, should emit clear board event", async () => {
        const wrapper = mount(GameStatsEventsPanel, {
            props: {
                isActive: true,
                statsData: statsData,
                elementStatsData: elementStatsData,
                eventsList: eventsList
            }
        });

        await wrapper.findAll("[data-test=control-button]")[2].trigger("click");
        expect(wrapper.emitted("clear-board")).toBeTruthy();
    });

    it("After click on change board size button, should emit change board size event", async () => {
        const wrapper = mount(GameStatsEventsPanel, {
            props: {
                isActive: true,
                statsData: statsData,
                elementStatsData: elementStatsData,
                eventsList: eventsList
            }
        });

        await wrapper.findAll("[data-test=control-button]")[3].trigger("click");
        expect(wrapper.emitted("change-board-size")).toBeTruthy();
    });

    it("Component should correctly display all data", async () => {
        const wrapper = mount(GameStatsEventsPanel, {
            props: {
                isActive: true,
                statsData: statsData,
                elementStatsData: elementStatsData,
                eventsList: eventsList
            }
        });

        expect(wrapper.find("[data-test=ants-count]").text()).toBe("Ants: 5");
        expect(wrapper.find("[data-test=dragons-count]").text()).toBe("Dragons: 3");
        expect(wrapper.find("[data-test=food-count]").text()).toBe("Food: 1");
        expect(wrapper.find("[data-test=health]").text()).toBe("Health: 100");
        expect(wrapper.find("[data-test=element-stats]").text()).toBe("X : 2 | Y : 2");
        
        await wrapper.findAll("[data-test=control-button]")[1].trigger("click");

        expect(wrapper.findAll("[data-test=event]").length).toBe(2);

        wrapper.findAll("[data-test=event]")
            .forEach((el, index) => expect(el.text()).toBe(`testTitle${ index }`));
    });
});

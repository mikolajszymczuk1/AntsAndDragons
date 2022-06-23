describe("sidePanel", () => {
    it("Go to main page", () => {
        cy.visit("index.html");
    });

    it("Panel should correctly shows count of each game element", () => {
        cy.viewport(1440, 1080);
        cy.get("[data-test=control-button]").eq(2).as("edit-mode").click();

        [4, 6, 8].forEach((boardSize) => {
            cy.get("[data-test=control-button]").eq(6).click();

            ["Ants", "Dragons", "Food"].forEach((countType) => {
                cy.get("[data-test=cell]").each(($el) => cy.wrap($el).click());
                cy.get(`[data-test=${ countType[0].toLocaleLowerCase() + countType.substring(1) }-count]`)
                    .contains(`${ countType }: ${ boardSize * boardSize }`);
            });
        });

        cy.get("[data-test=cell]").each(($el) => cy.wrap($el).click());
        cy.get("@edit-mode").click();
    });

    it("After click some cell, panel should shows correct position", () => {
        cy.viewport(1440, 1080);
        cy.get("[data-test=control-button]").eq(2).as("edit-mode").click();
        cy.get("[data-test=cell]").eq(5).as("clicked-cell").click();
        cy.get("@edit-mode").click();
        cy.get("@clicked-cell").click();

        cy.get("[data-test=health]").should("have.text", "Health: 100");
        cy.get("[data-test=element-stats]").should("have.text", "X : 5 | Y : 0");
        cy.get("[data-test=control-button]").eq(5).click();
    });

    it("Clear button should makes all cells empty", () => {
        cy.viewport(1440, 1080);
        cy.get("[data-test=control-button]").eq(2).as("edit-mode").click();
        
        cy.get("[data-test=cell]").each(($el) => {
            cy.wrap($el).click()
                .get("[data-test=ant]")
        });

        cy.get("[data-test=control-button]").eq(5).click();

        cy.get("[data-test=cell]").each(($el) => {
            cy.wrap($el).should("have.text", "");
        });

        cy.get("@edit-mode").click();
    });

    it("When events is coming, it should be shown in events tab", () => {
        cy.viewport(1440, 1080);
        cy.get("[data-test=stats]").should("be.visible");
        cy.get("[data-test=control-button]").eq(4).click();
        cy.get("[data-test=events]").should("be.visible");

        cy.get("[data-test=control-button]").eq(2).as("edit-mode").click();
        cy.get("[data-test=cell]").eq(0).click();
        
        Array(10).fill(0).forEach(() => 
            cy.get("[data-test=control-button]").eq(1).click()
        );

        cy.get("[data-test=event]").should("have.text", "Ant died !");
        cy.get("@edit-mode").click();
        cy.get("[data-test=control-button]").eq(3).click();
        cy.get("[data-test=control-button]").eq(5).click();
    });

    it("On mobile version, when user click 3 dots menu icon, app should shows panel for user", () => {
        cy.viewport(375, 600);
        cy.get("[data-test=exit-button]").as("exit").click();
        cy.get("[data-test=stats-events-panel]").click();
        cy.get("[data-test=stats]").as("stats").should("be.visible");
        cy.get("@exit").click();
        cy.get("@stats").should("not.be.visible");
    });
});

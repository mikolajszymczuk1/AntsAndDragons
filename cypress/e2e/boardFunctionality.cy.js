describe("Board functionality", () => {
    it("Go to main page", () => {
        cy.visit("index.html");
    });

    it("After click on each button, them should render correct game element", () => {
        cy.viewport(1440, 1028);
        cy.get("[data-test=control-button]").eq(2).click();
        
        cy.get("[data-test=cell]").each(($el) => {
            cy.wrap($el)
                .should("contain.text", "");
        });
        
        ["ant", "dragon", "food"].forEach((gameElement) => {
            cy.get("[data-test=cell]").each(($el) => {
                cy.wrap($el)
                    .click()
                    .get(`[data-test=${ gameElement }]`);
            });
        });

        cy.get("[data-test=cell]").each(($el) => {
            cy.wrap($el)
                .click()
                .should("contain.text", "");
        });
    });

    it("Round text should shows correct number of round", () => {
        cy.viewport(1440, 1080);
        cy.get("[data-test=round-count]").as("rounds")
            .should("have.text", " Round: 0");

        Array(15).fill(0).forEach(() =>
            cy.get("[data-test=control-button]").eq(1).click()
        );

        cy.get("@rounds").should("have.text", " Round: 15");
    });
});

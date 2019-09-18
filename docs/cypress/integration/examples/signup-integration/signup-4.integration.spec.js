/// <reference types="Cypress" />

context("The custom command could be run before the test code", () => {
  it("Should leverage the all-in-one authenticateAndVisitIntegration command", () => {
    cy.server();
    cy.route("GET", "**/api/tags", "fixture:tags/empty-tags").as("get-tags");
    cy.route("GET", "**/api/articles/feed**", "fixture:articles/empty-articles").as("get-feed");

    cy.authenticateAndVisitIntegration("/");

    cy.wait(["@get-tags", "@get-feed"]);
  });

  it("Should leverage the all-in-one authenticateAndVisitIntegration command 2", () => {
    cy.authenticateAndVisitIntegration("/editor");
    // the rest of the code
  });
});

/// <reference types="Cypress" />

import { paths } from "../../../../realworld/frontend/src/components/App";
import { noArticles } from "../../../../realworld/frontend/src/components/ArticleList";
import { strings } from "../../../../realworld/frontend/src/components/Register";

context("Signup flow", () => {
  it("The happy path should work", () => {
    // set up AJAX call interception
    cy.server();
    cy.route("POST", "**/api/users").as("signup-request");

    cy.visit(paths.register);

    // form filling
    const random = Math.floor(Math.random() * 100000);
    cy.getByPlaceholderText(strings.username).type(`Tester${random}`);
    cy.getByPlaceholderText(strings.email).type(`user+${random}@realworld.io`);
    cy.getByPlaceholderText(strings.password).type("mysupersecretpassword");

    // form submit...
    cy.get("form")
      .within(() => cy.getByText(strings.signUp))
      .click();
    // ... and AJAX call waiting
    cy.wait("@signup-request");

    // end of the flow
    cy.getByText(noArticles).should("be.visible");
  });
});

describe("service is available", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });
  it("should open main page by default", function () {
    cy.contains("Соберите бургер");
  });
  it("should move ingredients", function () {
    cy.get("div").contains("Краторная булка N-200i").trigger("dragstart");
    cy.get('[data-test="dropTarget"]').trigger("drop");
    cy.get("div").contains("Соус Spicy-X").trigger("dragstart");
    cy.get('[data-test="dropTarget"]').trigger("drop");
    cy.get('[data-test="bunUpContainer"]').children().should("have.length", 1);
    cy.get('[data-test="bunDownContainer"]').children().should("have.length", 1);
    cy.get('[data-test="ingredientsScrollbarContainer"]').children().should("have.length", 1);

  });
});

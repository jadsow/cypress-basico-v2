Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get("#firstName").type("Jadson");
    cy.get("#lastName").type("Pereira");
    cy.get("#email").type("p.jadsonn@gmail.com");
    cy.get("#open-text-area").type('teste');
    cy.contains('button', 'Enviar').click();

})
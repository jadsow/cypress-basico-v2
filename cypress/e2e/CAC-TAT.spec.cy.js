/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  this.beforeEach(() => {
    cy.viewport(410, 860)
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatórios e envia o formulário", () => {
    const longText = "Teste para verificar o delay do campo";
    cy.get("#firstName").type("Jadson");
    cy.get("#lastName").type("Pereira");
    cy.get("#email").type("p.jadsonn@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao encontrar erro no e-mail", () => {
    cy.get("#firstName").type("Jadson");
    cy.get("#lastName").type("Pereira");
    cy.get("#email").type("p.jadsonn@gmail,com");
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("Campo de telefone continua vazio quando preenchido incorretamente", () => {
    cy.get("#phone").type("abc").should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido", () => {
    cy.get("#firstName").type("Jadson");
    cy.get("#lastName").type("Pereira");
    cy.get("#email").type("p.jadsonn@gmail,com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("Prenche os campos nome e sobrenome e depois limpa", () => {
    cy.get("#firstName")
      .type("Jadson")
      .should("have.value", "Jadson")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Pereira")
      .should("have.value", "Pereira")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("p.jadsonn@gmail.com")
      .should("have.value", "p.jadsonn@gmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("1234567")
      .should("have.value", "1234567")
      .clear()
      .should("have.value", "");
  });

  it("Não preenche os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
  });

  it("Envia o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto por seu texto", () => {
    // cy.get('#product')
    //   .select('YouTube')
    //   .should('have.value', 'youtube')

    cy.contains("select", "Selecione")
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it("Seleciona o produto pelo seu valor", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona o produto pelo seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("Checar radio button", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("Marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check();
        cy.wrap(radio).should("be.checked");
      });
  });

  it("Check and uncheck checkbox", () => {
    // cy.get('input[type="checkbox"]')
    //   .check().wait(1000)
    //   .uncheck('phone')
    //   .should('not.be.checked')
    cy.get('input[type="checkbox"]')
      .check()
      .wait(1000)
      // .last()
      .should("be.checked")
      .first()
      .uncheck()
      .should("not.be.checked");
  });

  it("Upload de arquivos", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo simulando drag and drop", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo utilizando uma fixture que foi dado um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it('Verifica que a política de privacidade abre em uma outra págia sem a necessidade de um clique', () => {
    cy.get('a')
      .should('have.attr', 'target', '_blank')
  })

  it('Acessa removendo o target', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
      //verificando se tem o texto na página
      cy.contains('Talking About Testing')
        .should('be.visible')
  })

});

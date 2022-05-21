import "cypress-wait-until";

const path = require("path");

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

describe("Download Button", () => {
  it("should download a pdf file", () => {
    // Start from the index page
    cy.visit("/");

    // Use a name that is guaranteed to be not used in
    // the existing codebase.
    const NAME = `Daniel Düsentrieb v${generateRandomInteger(100)}`;

    const BUTTON = 'a[download*=".pdf"]';

    const FILENAME = "auslagenerstattung.pdf";
    const DOWNLOADS = Cypress.config("downloadsFolder");
    const FILEPATH = path.join(DOWNLOADS, FILENAME);

    // First check that the href attribute is not empty
    cy.get(BUTTON).should("have.attr", "href").should("not.be.empty");

    cy.get(BUTTON)
      .should("have.attr", "href")
      .then((hrefBefore) => {
        cy.log("hrefBefore:", hrefBefore);
        expect(hrefBefore.startsWith("blob:")).to.be.true;

        // Input the name into the input field and blur it
        // so that the form gets triggered to update the state
        cy.get("label")
          .contains("Kontoinhaber")
          .parent()
          .children("input")
          .type(NAME)
          .blur();

        cy.waitUntil(() =>
          cy
            .get(BUTTON)
            .should("have.attr", "href")
            .then((hrefAfter) => {
              cy.log("hrefAfter:", hrefAfter);
            })
            // We wait for the url to CHANGE, to
            // reflect the new value of the input
            .then((hrefAfter) => hrefAfter !== hrefBefore)
        );
      });

    // By clicking the button we download the file.
    cy.get(BUTTON).click();

    // Wait for the file to exist, before then reading it
    cy.waitUntil(() => cy.task("findPDF", FILEPATH));

    cy.task("readPdf", FILEPATH).then(({ numpages, text }) => {
      cy.log("**readPdf**", numpages);

      expect(numpages, "number of PDF pages").to.equal(1);
      expect(text, "has expected text").to.include("Auslagenerstattung");
      // Check that the information from the form is in the PDF
      expect(text, "has expected text").to.include(NAME);
    });
  });
});
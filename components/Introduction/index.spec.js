import React from "react";
import { mount } from "@cypress/react";
import Introduction from "./index";

it("renders <Introduction /> component", () => {
  mount(<Introduction />);

  const KEYWORDS = [
    "Auslagenerstattung",
    "Buchhaltung",

    "kostenlos",
    "ohne Benutzerkonto",

    "sicher",
    "Daten",

    "automatisch",
    "generiert",
  ];

  KEYWORDS.forEach((keyword) => {
    cy.contains(keyword);
  });
});

/// <reference types="cypress" />

import { formatAmount, getTotal } from "./money";

// A non-breaking space character
const SPACE = "\u00A0";

describe("formatAmount", () => {
  it("renders a number", () => {
    expect(formatAmount(0)).to.equal(`0,00${SPACE}€`);
    expect(formatAmount(100)).to.equal(`100,00${SPACE}€`);
  });
  it("displays thousand seperators", () => {
    expect(formatAmount(10000)).to.equal(`10.000,00${SPACE}€`);
    expect(formatAmount(10200)).to.equal(`10.200,00${SPACE}€`);
  });
  it("renders cents", () => {
    expect(formatAmount(19.95)).to.equal(`19,95${SPACE}€`);

    expect(formatAmount(0.25)).to.equal(`0,25${SPACE}€`);

    expect(formatAmount(0.2222)).to.equal(`0,22${SPACE}€`);
  });
  it("deals with other inputs", () => {
    expect(formatAmount(-1)).to.equal(`-1,00${SPACE}€`);

    expect(formatAmount(null)).to.equal(`0,00${SPACE}€`);
    expect(formatAmount(undefined)).to.equal(`0,00${SPACE}€`);
  });
});

describe("getTotal", () => {
  it("adds up numbers", () => {
    const records = [
      {
        amount: undefined,
      },
      {
        amount: null,
      },
      {
        amount: 0,
      },
      {
        amount: 10,
      },
      {
        amount: 5.5,
      },
      {
        amount: 100.25,
      },
    ];

    expect(getTotal(records)).to.equal(`115,75${SPACE}€`);
  });
  it("deals with other inputs", () => {
    expect(getTotal([])).to.equal(`0,00${SPACE}€`);
    expect(getTotal(null)).to.equal(`0,00${SPACE}€`);
    expect(getTotal(undefined)).to.equal(`0,00${SPACE}€`);
  });
});

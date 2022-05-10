import { IRecord } from "./state";

const euroFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export const parseAmount = (text: string): number => {
  text = text.replace(",", ".").replace("€", "").trim();
  const num = parseFloat(text);

  if (isNaN(num)) {
    return 0;
  }
  return num;
};
export const formatAmount = (text: string): string => {
  let num = parseAmount(text);
  return euroFormatter.format(num);
};

export const getTotal = (records: IRecord[]) => {
  const amounts = records.map((e) => parseAmount(e.amount));
  const total = amounts.reduce((partialSum, a) => partialSum + a, 0);

  return euroFormatter.format(total);
};

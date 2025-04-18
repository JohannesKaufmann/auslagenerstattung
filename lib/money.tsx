import { IRecord } from "./state";
import { formatValue } from "react-currency-input-field";

export const formatAmount = (value: number): string => {
  return formatValue({
    // Pad the values (e.g. 2.1 -> 2.10)
    decimalScale: 2,
    value: (value || 0).toString(),
    intlConfig: { locale: "de-DE", currency: "EUR" },
  });
};

const floatToInt = (num: number) => num * 100;
const intToFloat = (num: number) => Math.round(num) / 100;

export const getTotal = (records: IRecord[]): string => {
  if (!records) records = [];

  const amountsInCents = records
    .map((e) => e.amount)
    .filter((e) => e !== undefined && e !== null)
    .map((amount) => floatToInt(amount));

  const totalInCents = amountsInCents.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  return formatAmount(intToFloat(totalInCents));
};

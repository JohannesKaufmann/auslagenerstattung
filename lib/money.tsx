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

export const getTotal = (records: IRecord[]): string => {
  if (!records) records = [];

  const amounts = records
    .map((e) => e.amount)
    .filter((e) => e !== undefined && e !== null);

  const total = amounts.reduce((partialSum, a) => partialSum + a, 0);

  return formatAmount(total);
};

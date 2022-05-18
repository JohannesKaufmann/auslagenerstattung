import React from "react";
import { RawInput } from "components/Form/Input";
import CurrencyInput from "react-currency-input-field";
import { formatAmount } from "lib/money";

const EditableMoneyCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  return (
    <CurrencyInput
      customInput={RawInput}
      className="text-right tabular-nums"
      placeholder={formatAmount(0)}
      defaultValue={initialValue}
      intlConfig={{ locale: "de-DE", currency: "EUR" }}
      // Pad the values (e.g. 2.1 -> 2.10)
      decimalScale={2}
      onValueChange={(_, name, values) => {
        const value = values.float || 0;

        // Don't update the state if nothing changed
        if (value === initialValue) return;

        updateMyData(index, id, value);
      }}
    />
  );
};

export default EditableMoneyCell;

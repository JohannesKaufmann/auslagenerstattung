import React from "react";
import { RawInput } from "components/Form/Input";
import CurrencyInput from "react-currency-input-field";

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
      placeholder=""
      defaultValue={initialValue}
      intlConfig={{ locale: "de-DE", currency: "EUR" }}
      // Pad the values (e.g. 2.1 -> 2.10)
      decimalScale={2}
      onValueChange={(_, name, values) => {
        const value = values.float || 0;

        updateMyData(index, id, value);
      }}
    />
  );
};

export default EditableMoneyCell;

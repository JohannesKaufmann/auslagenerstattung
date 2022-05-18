import React from "react";

import { Fieldset, Input } from "components/Form";
import { IRecipient, placeholders } from "lib/state";

interface IProps {
  recipient: IRecipient;
  changeField: (group: string, key: string, val: any) => void;
}

const DataRecipient = ({ recipient, changeField }: IProps) => {
  return (
    <Fieldset title="Empfänger">
      <div className="grid grid-cols-3 gap-y-2 gap-x-4">
        <Input
          label="Kontoinhaber"
          autoComplete="name"
          placeholder={placeholders.recipient.account_owner}
          value={recipient.account_owner}
          onChange={(e) => {
            const val = e.target.value;
            changeField("recipient", "account_owner", val);
          }}
          containerProps={{
            className: "col-span-3",
          }}
        />

        <Input
          label="IBAN"
          className="tabular-nums"
          placeholder={placeholders.recipient.iban}
          value={recipient.iban}
          onChange={(e) => {
            const val = e.target.value;
            changeField("recipient", "iban", val);
          }}
          containerProps={{
            className: "col-span-3 md:col-span-2",
          }}
        />
        <Input
          label="BIC"
          className="tabular-nums"
          placeholder={placeholders.recipient.bic}
          value={recipient.bic}
          onChange={(e) => {
            const val = e.target.value;
            changeField("recipient", "bic", val);
          }}
          containerProps={{
            className: "col-span-3 md:col-span-1",
          }}
        />
      </div>
    </Fieldset>
  );
};
export default DataRecipient;

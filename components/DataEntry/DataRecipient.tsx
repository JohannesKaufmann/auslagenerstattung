import React from "react";

import { Fieldset, Input } from "components/Form";
import { IRecipient } from "lib/state";

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
          placeholder="Max Mustermann"
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
          placeholder="DE02100500000054540402"
          className="tabular-nums"
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
          placeholder="BELADEBE"
          className="tabular-nums"
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

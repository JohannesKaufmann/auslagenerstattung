import React from "react";

import { Fieldset, Input } from "components/Form";
import { ICompany } from "lib/state";

interface IProps {
  company: ICompany;
  changeField: (group: string, key: string, val: any) => void;
}
const DataCompany = ({ company, changeField }: IProps) => {
  return (
    <Fieldset title="Firma">
      <div className="grid grid-cols-3 gap-y-2 gap-x-4">
        <Input
          label="Firmenname"
          placeholder="Beispiel GmbH"
          value={company.name}
          onChange={(e) => {
            const val = e.target.value;
            changeField("company", "name", val);
          }}
          containerProps={{
            className: "col-span-3",
          }}
        />
        <Input
          label="Straße"
          placeholder="Musterstraße 1"
          value={company.street}
          onChange={(e) => {
            const val = e.target.value;
            changeField("company", "street", val);
          }}
          containerProps={{
            className: "col-span-3",
          }}
        />

        <Input
          label="PLZ"
          placeholder="12435"
          value={company.zipcode}
          onChange={(e) => {
            const val = e.target.value;
            changeField("company", "zipcode", val);
          }}
          containerProps={{
            className: "col-span-3 md:col-span-1",
          }}
        />
        <Input
          label="Ort"
          placeholder="Berlin"
          value={company.city}
          onChange={(e) => {
            const val = e.target.value;
            changeField("company", "city", val);
          }}
          containerProps={{
            className: "col-span-3 md:col-span-2",
          }}
        />
      </div>
    </Fieldset>
  );
};
export default DataCompany;

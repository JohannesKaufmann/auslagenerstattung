import React from "react";

import { Fieldset, Input } from "components/Form";
import { ICompany, placeholders } from "lib/state";

interface IProps {
  company: ICompany;
  changeField: (group: string, key: string, val: any) => void;
}
const DataCompany = ({ company, changeField }: IProps) => {
  return (
    <Fieldset title="Firma">
      <div className="grid grid-cols-3 gap-y-2 gap-x-4">
        <Input
          name="company_name"
          label="Firmenname"
          autoComplete="organization"
          placeholder={placeholders.company.name}
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
          name="company_street"
          label="Straße"
          autoComplete="address-line1"
          placeholder={placeholders.company.street}
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
          name="company_zipcode"
          label="PLZ"
          autoComplete="postal-code"
          placeholder={placeholders.company.zipcode}
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
          name="company_city"
          label="Ort"
          autoComplete="address-level1"
          placeholder={placeholders.company.city}
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

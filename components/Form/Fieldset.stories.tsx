import React from "react";
import { ComponentMeta } from "@storybook/react";

import Fieldset from "./Fieldset";

export default {
  title: "Fieldset",
  component: Fieldset,
} as ComponentMeta<typeof Fieldset>;

export const Default = () => (
  <Fieldset title={"Daten"}>
    <p>Some Content</p>
  </Fieldset>
);

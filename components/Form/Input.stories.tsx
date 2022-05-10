import React from "react";
import { ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default = () => <Input label="Name" />;

import React from "react";
import { ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default = () => <Button>Save</Button>;
export const Primary = () => <Button primary>Save</Button>;

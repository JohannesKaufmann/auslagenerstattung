import React from "react";
import { ComponentMeta } from "@storybook/react";

import Attachment from "./Attachment";

export default {
  title: "Attachment",
  component: Attachment,
} as ComponentMeta<typeof Attachment>;

export const Default = () => <Attachment />;

export const IsOpen = () => <Attachment isOpen />;
export const IsLoading = () => <Attachment isLoading />;

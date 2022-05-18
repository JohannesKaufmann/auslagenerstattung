import React from "react";
import { ComponentMeta } from "@storybook/react";

import AttachmentComponent from "./Attachment";

const Attachment = (props) => (
  <div className="w-40 aspect-dina4">
    <AttachmentComponent {...props} />
  </div>
);

export default {
  title: "Attachment",
  component: Attachment,
} as ComponentMeta<typeof Attachment>;

export const Default = () => <Attachment />;

export const IsOpen = () => <Attachment isOpen />;
export const IsLoading = () => <Attachment isLoading />;

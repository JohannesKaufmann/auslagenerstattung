import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

export const ContentWrapper = ({
  icon,
  title,
  content,
  bottom,
}: {
  icon: ReactNode;
  title: ReactNode;
  content: ReactNode;
  bottom: ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center justify-center">{icon}</div>
      <Dialog.Title className="mt-4 text-center font-semibold text-lg">
        {title}
      </Dialog.Title>

      <div className="mt-4">{content}</div>

      <div className="mt-8">{bottom}</div>
    </div>
  );
};

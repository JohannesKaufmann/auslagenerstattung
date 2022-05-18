import React from "react";
import { X as CloseIcon, Loader as LoaderIcon } from "react-feather";

export const ROUNDING = "rounded-md";

const Attachment = ({
  src = "",
  isOpen = false,
  isLoading = false,
  onClick = () => {},
  onClickRemove = () => {},
}) => {
  let cursor;
  if (isLoading) {
  } else {
    cursor = isOpen ? "cursor-zoom-out" : "cursor-zoom-in";
  }

  return (
    <div
      className={`relative h-full w-full ${ROUNDING} transition-all bg-gray-50 border border-gray-300 hover:border-blue-500 overflow-hidden shadow hover:shadow-md 
    ${cursor}
  `}
    >
      <img
        className={`h-full w-full object-cover bg-gray-50`}
        src={src}
        style={{
          // To get rid of the border if no image is displayed
          transform: "scale(1.04)",
        }}
      />

      {/* Buttons can't be nested in each other, so need to place it absolute */}
      <button
        className="absolute inset-0 w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (isLoading) return;

          onClick();
        }}
      />

      <button
        className="absolute top-2 right-2 text-white transition-colors bg-gray-300 hover:bg-gray-400 rounded-full p-1"
        title="Remove Image"
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (isLoading) return;

          onClickRemove();
        }}
      >
        {isLoading ? (
          <LoaderIcon
            size={16}
            className="animate-[spin_2.5s_linear_infinite]"
          />
        ) : (
          <CloseIcon color="white" size={16} />
        )}
      </button>
    </div>
  );
};
export default Attachment;

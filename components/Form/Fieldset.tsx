import React from "react";

const Fieldset = ({ title, children, className = "", ...rest }) => {
  // TODO: add optional description?
  return (
    <fieldset
      {...rest}
      className={`w-full mt-4 pt-2 pb-4 px-4 rounded border border-gray-300 ${className}`}
    >
      <legend className="bg-white px-1 font-bold">{title}</legend>

      <div>{children}</div>
    </fieldset>
  );
};
export default Fieldset;

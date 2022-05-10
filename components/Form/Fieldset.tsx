import React from "react";

const Fieldset = ({ title, children, className = "", ...rest }) => {
  // TODO: add optional description?
  return (
    <fieldset
      {...rest}
      className={`mt-4 py-2 px-4 rounded border border-gray-300 ${className}`}
    >
      <legend className="bg-white px-1 font-bold">{title}</legend>

      <div>{children}</div>
    </fieldset>
  );
};
export default Fieldset;

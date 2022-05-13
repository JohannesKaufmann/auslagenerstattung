import React from "react";

export const RawInput = ({ className = "", ...rest }) => (
  <input
    type="text"
    {...rest}
    className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-300 w-full ${className}`}
  />
);
const Input = ({ containerProps = {}, label, labelProps = {}, ...rest }) => (
  <label {...containerProps}>
    <span className="text-sm font-medium text-gray-700" {...labelProps}>
      {label}
    </span>
    <RawInput {...rest} />
  </label>
);
export default Input;

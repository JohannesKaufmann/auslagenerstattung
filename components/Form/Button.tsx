import React from "react";

const FOCUS =
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

const PRIMARY = "border-transparent text-white bg-blue-600 hover:bg-blue-700";
const SECONDARY =
  "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:text-gray-300";

const RELAXED = "py-2 px-4";
const DENSE = "py-2 px-3 leading-4";

const Button = ({
  primary = false,
  dense = false,
  disabled = false,
  as = "button",
  className = "",
  ...rest
}) => {
  return (
    <CustomTag
      as={as}
      disabled={disabled}
      className={`inline-flex justify-center border shadow-sm text-sm font-medium rounded-md ${FOCUS} ${
        primary ? PRIMARY : SECONDARY
      } ${dense ? DENSE : RELAXED} ${className}`}
      {...rest}
    />
  );
};
export default Button;

const CustomTag = ({ as, ...props }) => {
  return React.createElement(as, props);
};

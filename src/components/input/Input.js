import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input
      className="w-full pl-2 mb-2 text-xs border outline-none bg-slate-100 h-9"
      type={type}
      id={name}
      {...field}
      {...props}
    />
  );
};
Input.propTypes = {
  // value: PropTypes.string
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
};
export default Input;

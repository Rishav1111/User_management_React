import React from "react";

const Input = ({ type, id, name, value, onChange }) => {
  return (
    <input
      className="border  outline-none bg-slate-200 w-full h-8 rounded-lg p-2"
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

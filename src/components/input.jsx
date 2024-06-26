import React from "react";

const Input = ({ type, id, name, value, onChange }) => {
  return (
    <input
      className="border border-slate-700 outline-none bg-slate-200 w-full rounded-lg p-2 mb-2"
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

import React, { ChangeEvent } from "react";

interface InputProps {
  type: string;
  id: string;
  name: string;
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, id, name, value, onChange }) => {
  return (
    <input
      className="border outline-none bg-slate-200 w-full h-8 rounded-lg p-2"
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      data-testid="custom-input"
    />
  );
};

export default Input;

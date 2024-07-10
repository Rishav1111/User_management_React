import React from "react";

interface LabelProps {
  htmlFor: string;
  text: string;
}
const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return (
    <label className="font-bold text-gray-700 mb-2 mt-2" htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export default Label;

import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick, color }) => {
  return (
    <button
      className={` ${color} flex justify-center items-center mt-4 self-center w-28 h-8 p-2 text-white font-semibold rounded-3xl text-sm mb-4 border-none`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

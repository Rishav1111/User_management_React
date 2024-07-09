import React from "react";

const Button = ({ type, text, onClick, color }) => {
  return (
    <button
      className={` ${color} flex justify-center items-center mt-4  w-28 h-8 self-center p-2 text-white font-semibold rounded-3xl text-sm mb-3 border-none`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

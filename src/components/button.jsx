const Button = ({ type, text, onClick }) => {
  return (
    <button
      className="bg-gray-600 hover:bg-gray-700 w-32 self-center p-2 text-white font-semibold rounded-3xl text-sm mb-3 border-none"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

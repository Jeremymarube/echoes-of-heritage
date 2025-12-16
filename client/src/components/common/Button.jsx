export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const base = "px-4 py-2 rounded font-medium transition";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
};

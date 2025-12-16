export const Toast = ({ message, type = "success" }) => {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`${colors[type]} text-white px-4 py-2 rounded fixed bottom-5 right-5`}>
      {message}
    </div>
  );
};

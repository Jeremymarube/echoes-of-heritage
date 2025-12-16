export default function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition
        ${active ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
    >
      {label}
    </button>
  );
}

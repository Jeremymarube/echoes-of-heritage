export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="border p-2 rounded w-full"
      placeholder="Search events..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

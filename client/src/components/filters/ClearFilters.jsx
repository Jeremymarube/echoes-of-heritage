export default function ClearFilters({ hasFilters, onClear }) {
  if (!hasFilters) return null;

  return (
    <button
      onClick={onClear}
      className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
    >
      Clear Filters
    </button>
  );
}

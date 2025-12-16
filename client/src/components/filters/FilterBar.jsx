import CategoryPill from "./CategoryPill";

const categories = ["All", "Dance", "Music", "Panel"];

export default function FilterBar({ selected, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <CategoryPill
          key={cat}
          label={cat}
          active={selected === cat}
          onClick={() => onSelect(cat)}
        />
      ))}
    </div>
  );
}

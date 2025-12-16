export default function useFilters(events, category) {
  if (category === "All") return events;
  return events.filter((event) => event.category === category);
}

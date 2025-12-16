export default function useSearch(events, query) {
  return events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );
}

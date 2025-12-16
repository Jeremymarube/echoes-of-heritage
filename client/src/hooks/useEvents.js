import { useState } from "react";

export default function useEvents() {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  return { events, addEvent };
}

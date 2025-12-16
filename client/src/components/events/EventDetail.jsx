import { Button } from "../common/Button";

export const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-sm text-gray-600">{event.description}</p>

        <div className="mt-4 text-sm">
          <p><strong>Type:</strong> {event.category}</p>
          <p><strong>Date:</strong> {event.date}</p>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button>Add to Agenda</Button>
        </div>
      </div>
    </div>
  );
};

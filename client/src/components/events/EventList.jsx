import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import { Calendar } from 'lucide-react';

const EventList = ({ events, loading, onFavorite, favorites = [], onEventClick }) => {
  if (loading) {
    return <LoadingSpinner size="lg" message="Loading events..." />;
  }

  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Events Found"
        description="There are no events matching your criteria. Try adjusting your filters."
      />
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <EventCard
            event={event}
            onFavorite={onFavorite}
            isFavorite={favorites.includes(event.id)}
            onClick={() => onEventClick && onEventClick(event)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EventList;
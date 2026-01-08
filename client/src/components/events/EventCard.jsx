import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Heart } from 'lucide-react';
import { EVENT_TYPES } from '../../utils/constants';
import { formatDate, formatTime } from '../../utils/dateUtils';

const EventCard = ({ event, onFavorite, isFavorite = false, onClick }) => {
  const eventType = EVENT_TYPES.find(t => t.id === event.type) || EVENT_TYPES[0];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer card-hover border-t-4"
      style={{ borderTopColor: eventType.color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {eventType.icon}
        </div>
        {event.image_url && (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Favorite Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite && onFavorite(event.id);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </motion.button>

        {/* Event Type Badge */}
        <div 
          className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg"
          style={{ backgroundColor: eventType.color }}
        >
          {eventType.label}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{formatDate(event.scheduled_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="w-4 h-4 text-accent" />
            <span>{formatTime(event.scheduled_time)} • {event.duration} min</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{event.venue_name || 'TBA'}</span>
          </div>
          {event.max_attendees && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Users className="w-4 h-4 text-accent" />
              <span>Max {event.max_attendees} attendees</span>
            </div>
          )}
        </div>

        {/* Presenter Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Presented by</p>
          <p className="font-semibold text-gray-900">{event.presenter_name}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
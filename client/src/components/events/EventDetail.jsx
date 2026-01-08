import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Mail, 
  Phone,
  Share2,
  Download,
  X
} from 'lucide-react';
import Button from '../common/Button';
import { EVENT_TYPES } from '../../utils/constants';
import { formatDate, formatTime } from '../../utils/dateUtils';

const EventDetail = ({ event, onClose }) => {
  const eventType = EVENT_TYPES.find(t => t.id === event.type) || EVENT_TYPES[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Image */}
      <div 
        className="relative h-64 rounded-2xl overflow-hidden mb-6"
        style={{ backgroundColor: eventType.color }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-8xl">
          {eventType.icon}
        </div>
        {event.image_url && (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Share2}
            onClick={handleShare}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Event Type Badge */}
      <div className="mb-4">
        <span 
          className="inline-block px-4 py-2 rounded-full text-white font-semibold"
          style={{ backgroundColor: eventType.color }}
        >
          {eventType.label}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {event.title}
      </h1>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="w-6 h-6 text-accent" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-900">{formatDate(event.scheduled_date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="w-6 h-6 text-accent" />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold text-gray-900">
              {formatTime(event.scheduled_time)} ({event.duration} min)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <MapPin className="w-6 h-6 text-accent" />
          <div>
            <p className="text-sm text-gray-500">Venue</p>
            <p className="font-semibold text-gray-900">{event.venue_name || 'TBA'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-accent" />
          <div>
            <p className="text-sm text-gray-500">Capacity</p>
            <p className="font-semibold text-gray-900">
              {event.max_attendees ? `Max ${event.max_attendees}` : 'Unlimited'}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>

      {/* Cultural Background */}
      {event.cultural_background && (
        <div className="mb-8 p-6 bg-primary/10 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cultural Significance</h2>
          <p className="text-gray-700 leading-relaxed">
            {event.cultural_background}
          </p>
        </div>
      )}

      {/* Equipment Needed */}
      {event.equipment_needed && JSON.parse(event.equipment_needed).length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Equipment Provided</h2>
          <div className="flex flex-wrap gap-2">
            {JSON.parse(event.equipment_needed).map((equipment, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
              >
                {equipment}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Presenter Info */}
      <div className="mb-8 p-6 border-2 border-gray-200 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Presenter Information</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {event.presenter_name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.presenter_name}</h3>
            {event.contact_email && (
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${event.contact_email}`} className="hover:text-accent">
                  {event.contact_email}
                </a>
              </div>
            )}
            {event.contact_phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <a href={`tel:${event.contact_phone}`} className="hover:text-accent">
                  {event.contact_phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="primary" size="lg" className="flex-1">
          Add to My Schedule
        </Button>
        <Button variant="outline" size="lg" icon={Download}>
          Download iCal
        </Button>
      </div>
    </div>
  );
};

export default EventDetail;
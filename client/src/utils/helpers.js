// src/utils/helpers.js
import { PRESENTATION_TYPES } from './constants';

export const getPresentationType = (typeValue) => {
  return PRESENTATION_TYPES.find(t => t.value === typeValue) || PRESENTATION_TYPES[0];
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    scheduled: 'primary'
  };
  return colors[status] || 'default';
};

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const groupByDate = (items, dateKey = 'scheduled_date') => {
  return items.reduce((groups, item) => {
    const date = item[dateKey];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};

export const filterBySearchTerm = (items, searchTerm, searchKeys = ['title', 'presenter_name', 'description']) => {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    searchKeys.some(key => 
      item[key]?.toLowerCase().includes(term)
    )
  );
};

export const filterByType = (items, type) => {
  if (!type || type === 'all') return items;
  return items.filter(item => item.type === type);
};

export const filterByDate = (items, date) => {
  if (!date || date === 'all') return items;
  return items.filter(item => item.scheduled_date === date);
};

export const filterByVenue = (items, venueId) => {
  if (!venueId || venueId === 'all') return items;
  return items.filter(item => item.venue_id === parseInt(venueId));
};

export const exportToCalendar = (event) => {
  // Generate ICS file content for calendar export
  const startDate = new Date(`${event.scheduled_date}T${event.scheduled_time}`);
  const endDate = new Date(startDate.getTime() + event.duration * 60000);
  
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue?.name || 'TBD'}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
  link.click();
  URL.revokeObjectURL(url);
};

export const generateQRCode = (text) => {
  // In a real app, use a QR code library
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
};
// src/utils/constants.js

export const PRESENTATION_TYPES = [
  { value: 'dance', label: 'Dance Performance', icon: '💃', color: 'orange' },
  { value: 'music', label: 'Musical Performance', icon: '🎵', color: 'blue' },
  { value: 'panel', label: 'Panel Discussion', icon: '🗣️', color: 'purple' },
  { value: 'exhibition', label: 'Cultural Exhibition', icon: '🎨', color: 'green' },
  { value: 'food', label: 'Food Showcase', icon: '🍜', color: 'red' },
  { value: 'workshop', label: 'Workshop', icon: '🛠️', color: 'teal' },
  { value: 'film', label: 'Film Screening', icon: '🎬', color: 'indigo' },
  { value: 'art', label: 'Art Display', icon: '🖼️', color: 'pink' }
];

export const PRESENTATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SCHEDULED: 'scheduled'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  PRESENTER: 'presenter',
  ATTENDEE: 'attendee'
};

export const DURATIONS = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' }
];

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

export const EQUIPMENT_OPTIONS = [
  { value: 'projector', label: 'Projector' },
  { value: 'microphone', label: 'Microphone' },
  { value: 'sound_system', label: 'Sound System' },
  { value: 'tables', label: 'Tables' },
  { value: 'chairs', label: 'Chairs' },
  { value: 'stage', label: 'Stage' }
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const CULTURE_WEEK_DATES = {
  START: '2024-03-18',
  END: '2024-03-22',
  YEAR: 2024
};
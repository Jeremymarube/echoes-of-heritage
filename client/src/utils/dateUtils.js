// src/utils/dateUtils.js

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHours = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayHours}:${minutes} ${period}`;
};

export const formatDateTime = (date, time) => {
  return `${formatDate(date)} at ${formatTime(time)}`;
};

export const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(new Date(current).toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const getDayOfWeek = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { weekday: 'long' });
};

export const isToday = (date) => {
  const today = new Date().toISOString().split('T')[0];
  return date === today;
};

export const isPast = (date) => {
  const today = new Date().toISOString().split('T')[0];
  return date < today;
};

export const isFuture = (date) => {
  const today = new Date().toISOString().split('T')[0];
  return date > today;
};

export const sortByDateTime = (a, b) => {
  const dateA = new Date(`${a.scheduled_date} ${a.scheduled_time}`);
  const dateB = new Date(`${b.scheduled_date} ${b.scheduled_time}`);
  return dateA - dateB;
};
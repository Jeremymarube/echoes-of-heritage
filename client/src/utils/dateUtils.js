import { format, parseISO, isAfter, isBefore } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), 'MMM dd, yyyy');
  } catch {
    return format(new Date(date), 'MMM dd, yyyy');
  }
};

export const formatTime = (time) => {
  if (!time) return '';
  try {
    return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
  } catch {
    return time;
  }
};

export const formatDateTime = (date, time) => {
  return `${formatDate(date)} at ${formatTime(time)}`;
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  return isAfter(checkDate, new Date(startDate)) && isBefore(checkDate, new Date(endDate));
};
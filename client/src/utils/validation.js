// src/utils/validation.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return phone.length >= 10 && re.test(phone);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const validatePresentationForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.title)) {
    errors.title = 'Title is required';
  } else if (!validateMaxLength(formData.title, 200)) {
    errors.title = 'Title must be less than 200 characters';
  }

  if (!validateRequired(formData.presenter_name)) {
    errors.presenter_name = 'Presenter name is required';
  }

  if (!validateRequired(formData.type)) {
    errors.type = 'Presentation type is required';
  }

  if (!validateRequired(formData.description)) {
    errors.description = 'Description is required';
  } else if (!validateMinLength(formData.description, 50)) {
    errors.description = 'Description must be at least 50 characters';
  }

  if (!validateRequired(formData.duration)) {
    errors.duration = 'Duration is required';
  }

  if (!validateRequired(formData.contact_email)) {
    errors.contact_email = 'Contact email is required';
  } else if (!validateEmail(formData.contact_email)) {
    errors.contact_email = 'Invalid email format';
  }

  if (formData.contact_phone && !validatePhone(formData.contact_phone)) {
    errors.contact_phone = 'Invalid phone number format';
  }

  if (formData.max_attendees && (formData.max_attendees < 1 || formData.max_attendees > 1000)) {
    errors.max_attendees = 'Max attendees must be between 1 and 1000';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
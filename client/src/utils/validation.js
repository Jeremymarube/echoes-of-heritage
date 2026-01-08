export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    }
    
    if (rule.phone && value && !validatePhone(value)) {
      errors[field] = 'Invalid phone format';
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Minimum ${rule.minLength} characters required`;
    }
  });
  
  return errors;
};
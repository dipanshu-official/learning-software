// Form validation utilities

export const validateEmail = (ema) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone)  => {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateAadhaar = (aadhaar) => {
  const aadhaarRegex = /^\d{12}$/;
  return aadhaarRegex.test(aadhaar);
};

export const validatePincode = (pincode) => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};

export const validateRequired = (value) => {
  return value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

export const validateNumber = (value) => {
  return !isNaN(Number(value)) && Number(value) >= 0;
};

export const validateDate = (date) => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

export const validateStudentForm = (data) => {
  const errors = [];

  if (!validateRequired(data.firstName)) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!validateRequired(data.lastName)) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!validatePhone(data.studentContact)) {
    errors.push({ field: 'studentContact', message: 'Please enter a valid phone number' });
  }

  if (!validateAadhaar(data.aadhaarNumber)) {
    errors.push({ field: 'aadhaarNumber', message: 'Please enter a valid 12-digit Aadhaar number' });
  }

  if (!validatePincode(data.pincode)) {
    errors.push({ field: 'pincode', message: 'Please enter a valid 6-digit pincode' });
  }

  if (!validateNumber(data.totalFees)) {
    errors.push({ field: 'totalFees', message: 'Please enter a valid fee amount' });
  }

  if (!validateNumber(data.paidFees)) {
    errors.push({ field: 'paidFees', message: 'Please enter a valid paid amount' });
  }

  if (Number(data.paidFees) > Number(data.totalFees)) {
    errors.push({ field: 'paidFees', message: 'Paid amount cannot exceed total fees' });
  }

  return errors;
};
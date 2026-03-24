/**
 * Validate pincode: must be exactly 6 digits.
 * @param {string} pincode
 * @returns {boolean}
 */
export const isValidPincode = pincode => {
  return /^\d{6}$/.test(pincode);
};

/**
 * Validate phone number: must be exactly 10 digits.
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = phone => {
  return /^\d{10}$/.test(phone);
};

/**
 * Validate Basic Info form fields.
 * @param {object} fields - { name, line1, line2, pincode }
 * @returns {object} - { isValid, errors }
 */
export const validateBasicInfo = ({name, line1, pincode}) => {
  const errors = {};

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!line1 || line1.trim() === '') {
    errors.line1 = 'Address Line 1 is required';
  }

  if (!pincode || pincode.trim() === '') {
    errors.pincode = 'Pin Code is required';
  } else if (!isValidPincode(pincode)) {
    errors.pincode = 'Pin Code must be 6 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate Sports Info form fields.
 * @param {object} fields - { sport }
 * @returns {object} - { isValid, errors }
 */
export const validateSportsInfo = ({sport}) => {
  const errors = {};

  if (!sport || sport.trim() === '') {
    errors.sport = 'Please select a sport';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

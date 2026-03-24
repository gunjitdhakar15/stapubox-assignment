import apiClient from './client';

/**
 * Send OTP to the given phone number.
 * @param {string} phone - Phone number (10 digits)
 * @returns {Promise} API response
 */
export const sendOtp = async phone => {
  const response = await apiClient.post('/trial/sendOtp', {phone});
  return response.data;
};

/**
 * Verify OTP and receive JWT token.
 * @param {string} phone - Phone number
 * @param {string} otp - 4-digit OTP
 * @returns {Promise} API response containing JWT token
 */
export const verifyOtp = async (phone, otp) => {
  const response = await apiClient.post('/trial/verifyOtp', {phone, otp});
  return response.data;
};

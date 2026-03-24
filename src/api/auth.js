import apiClient from './client';

/**
 * Send OTP to the given phone number.
 * @param {string} phone - Phone number (10 digits)
 * @returns {Promise} API response
 */
export const sendOtp = async phone => {
  const response = await apiClient.post('/trial/sendOtp', {mobile: phone});
  if (response.data?.status === 'failed') {
    throw new Error(response.data?.msg || 'Failed to send OTP');
  }
  return response.data;
};

/**
 * Verify OTP and receive JWT token.
 * @param {string} phone - Phone number
 * @param {string} otp - 4-digit OTP
 * @param {number | null} sessionId - Session id returned by sendOtp
 * @returns {Promise} API response containing JWT token
 */
export const verifyOtp = async (phone, otp, sessionId = null) => {
  const payload = {
    mobile: phone,
    otp,
  };

  if (sessionId) {
    payload.sessionId = sessionId;
  }

  const response = await apiClient.post('/trial/verifyOtp', payload, {
    params: payload,
  });

  if (response.data?.status === 'failed') {
    throw new Error(response.data?.msg || 'Invalid OTP or expired');
  }

  return response.data;
};

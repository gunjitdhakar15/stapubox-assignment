import apiClient from './client';

/**
 * Fetch list of sports from the API.
 * @returns {Promise} Array of sport objects
 */
export const getSports = async () => {
  const response = await apiClient.get('/sports/');
  return response.data;
};

/**
 * Fetch player profile data.
 * Returns player_data if exists, or throws if 404 (no data found).
 * @returns {Promise} Player data object
 */
export const getPlayer = async () => {
  try {
    const response = await apiClient.get('/trial/player');
    return response.data;
  } catch (error) {
    if (error.status === 404) {
      return null; // No profile exists
    }
    throw error;
  }
};

/**
 * Save player profile data.
 * @param {object} playerData - Complete player_data payload
 * @returns {Promise} API response
 */
export const savePlayer = async playerData => {
  const response = await apiClient.post('/trial/player', {
    player_data: playerData,
  });
  return response.data;
};

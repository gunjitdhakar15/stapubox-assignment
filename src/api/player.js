import apiClient from './client';

const looksLikePlayerData = value => {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    ('name' in value ||
      'address' in value ||
      'sport' in value ||
      'feedback' in value)
  );
};

const extractPlayerData = payload => {
  if (!payload) {
    return null;
  }

  if (payload.status === 'failed' && payload.err === 'NOT FOUND') {
    return null;
  }

  if (looksLikePlayerData(payload.player_data)) {
    return payload.player_data;
  }

  if (looksLikePlayerData(payload.data?.player_data)) {
    return payload.data.player_data;
  }

  if (looksLikePlayerData(payload.data)) {
    return payload.data;
  }

  if (looksLikePlayerData(payload)) {
    return payload;
  }

  return null;
};

/**
 * Fetch list of sports from the API.
 * @returns {Promise} Array of sport objects
 */
export const getSports = async () => {
  const response = await apiClient.get('/sports/');
  const payload = response.data;

  if (payload?.status === 'failed') {
    throw new Error(payload?.msg || 'Failed to fetch sports list');
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
};

/**
 * Fetch player profile data.
 * Returns player_data if it exists, or null when no saved profile is found.
 * @returns {Promise} Player data object
 */
export const getPlayer = async () => {
  try {
    const response = await apiClient.get('/trial/player');
    const payload = response.data;
    const playerData = extractPlayerData(payload);

    if (playerData) {
      return playerData;
    }

    if (payload?.status === 'failed') {
      throw new Error(payload?.msg || 'Failed to fetch profile');
    }

    return null;
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
  if (response.data?.status === 'failed') {
    throw new Error(response.data?.msg || 'Failed to save profile');
  }
  return response.data;
};

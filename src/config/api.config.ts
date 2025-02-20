/**
 * @fileoverview API configuration constants
 * @module ApiConfig
 */

/**
 * API configuration object containing base URL and endpoints
 * @constant
 * @type {Object}
 * @property {string} BASE_URL - Base URL for all API requests
 * @property {Object} ENDPOINTS - Object containing all API endpoint paths
 * @property {string} ENDPOINTS.USER - Endpoint for fetching user data (/user/:id)
 * @property {string} ENDPOINTS.USER_ACTIVITY - Endpoint for user activity data (/user/:id/activity)
 * @property {string} ENDPOINTS.USER_AVERAGE_SESSIONS - Endpoint for user average sessions (/user/:id/average-sessions)
 * @property {string} ENDPOINTS.USER_PERFORMANCE - Endpoint for user performance data (/user/:id/performance)
 *
 * @example
 * ```ts
 * import { API_CONFIG } from './api.config';
 *
 * const userUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.replace(':id', '12')}`;
 * // Result: http://localhost:3000/user/12
 * ```
 */
export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  ENDPOINTS: {
    USER: "/user/:id",
    USER_ACTIVITY: "/user/:id/activity",
    USER_AVERAGE_SESSIONS: "/user/:id/average-sessions",
    USER_PERFORMANCE: "/user/:id/performance",
  },
};

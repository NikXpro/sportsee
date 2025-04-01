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
 * @property {boolean} USE_MOCKED_DATA - Flag to enable/disable mocked data
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
  USE_MOCKED_DATA: true,
};

/**
 * Set the data source to either use API or mock data
 * @param {boolean} useMock - Whether to use mocked data (true) or API data (false)
 */
export function setDataSource(useMock: boolean): void {
  API_CONFIG.USE_MOCKED_DATA = useMock;
  console.log(`Data source set to: ${useMock ? "MOCK" : "API"}`);
}

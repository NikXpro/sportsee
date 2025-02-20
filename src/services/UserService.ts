/**
 * @fileoverview User Service for handling all user-related API calls
 * @module UserService
 */

import { API_CONFIG } from "../config/api.config";
import User from "../models/User";

/**
 * Service class implementing the Singleton pattern for managing user data
 * Handles all API calls related to user information, activities, and performance
 */
class UserService {
  private static instance: UserService;

  /**
   * Private constructor to prevent direct construction calls with the `new` operator
   */
  private constructor() {}

  /**
   * Gets the singleton instance of UserService
   * @returns {UserService} The singleton instance
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Constructs the full URL for API endpoints
   * @param {string} endpoint - The API endpoint path with :id placeholder
   * @param {number} id - The user ID to replace in the endpoint
   * @returns {string} The complete URL for the API call
   * @private
   */
  private getUrl(endpoint: string, id: number): string {
    return `${API_CONFIG.BASE_URL}${endpoint.replace(":id", id.toString())}`;
  }

  /**
   * Generic method to fetch data from the API
   * @param {string} url - The complete URL to fetch from
   * @returns {Promise<any>} The parsed JSON response data
   * @throws {Error} If the network response is not ok
   * @private
   */
  private async fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * Retrieves complete user data including activity, sessions, and performance
   * @param {number} userId - The ID of the user to fetch data for
   * @returns {Promise<User>} A promise that resolves to a User instance with all data
   * @throws {Error} If there's an error fetching any of the user data
   */
  public async getUserData(userId: number): Promise<User> {
    try {
      // Fetch main user data
      const userData = await this.fetchData(
        this.getUrl(API_CONFIG.ENDPOINTS.USER, userId)
      );

      // Fetch activity data
      const activityData = await this.fetchData(
        this.getUrl(API_CONFIG.ENDPOINTS.USER_ACTIVITY, userId)
      );

      // Fetch average sessions
      const averageSessionsData = await this.fetchData(
        this.getUrl(API_CONFIG.ENDPOINTS.USER_AVERAGE_SESSIONS, userId)
      );

      // Fetch performance data
      const performanceData = await this.fetchData(
        this.getUrl(API_CONFIG.ENDPOINTS.USER_PERFORMANCE, userId)
      );

      // Combine all data
      const completeUserData = {
        ...userData,
        activity: activityData,
        averageSessions: averageSessionsData,
        performance: performanceData,
      };

      // Create new User instance with all data
      return new User(completeUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  /**
   * Checks if a user exists in the system
   * @param {number} userId - The ID of the user to check
   * @returns {Promise<boolean>} True if the user exists, false otherwise
   */
  public async userExists(userId: number): Promise<boolean> {
    try {
      await this.fetchData(this.getUrl(API_CONFIG.ENDPOINTS.USER, userId));
      return true;
    } catch {
      return false;
    }
  }
}

export default UserService.getInstance();

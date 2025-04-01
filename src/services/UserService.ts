/**
 * @fileoverview User Service for handling all user-related API calls
 * @module UserService
 */

import { API_CONFIG } from "../config/api.config";
import { MOCKED_DATA } from "../data/mockData";
import User from "../models/User";

/**
 * Type representing the endpoint names in API_CONFIG.ENDPOINTS
 */
type EndpointKey = keyof typeof API_CONFIG.ENDPOINTS;

/**
 * Type representing the data categories in MOCKED_DATA
 */
type MockedDataKey = keyof typeof MOCKED_DATA;

/**
 * Interface for user data structure from the API or mock
 */
interface UserApiData {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  score?: number;
  todayScore?: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

/**
 * Interface for activity data structure from the API or mock
 */
interface ActivityApiData {
  userId: number;
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  }[];
}

/**
 * Interface for average sessions data structure from the API or mock
 */
interface AverageSessionsApiData {
  userId: number;
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}

/**
 * Interface for performance data structure from the API or mock
 */
interface PerformanceApiData {
  userId: number;
  kind: { [key: number]: string };
  data: {
    value: number;
    kind: number;
  }[];
}

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
   * @returns {Promise<unknown>} The parsed JSON response data
   * @throws {Error} If the network response is not ok
   * @private
   */
  private async fetchData(url: string): Promise<unknown> {
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
   * Get the mocked data for the specified endpoint and user ID
   * @param {string} endpoint - The endpoint type (USER, USER_ACTIVITY, etc.)
   * @param {number} userId - The user ID
   * @returns {unknown} The mocked data for the specified endpoint and user
   * @throws {Error} If the mocked data doesn't exist
   * @private
   */
  private getMockData(endpoint: string, userId: number): unknown {
    // Extract the endpoint name from the full path (e.g., "/user/:id" -> "USER")
    const endpointName = Object.keys(API_CONFIG.ENDPOINTS).find(
      (key) => API_CONFIG.ENDPOINTS[key as EndpointKey] === endpoint
    ) as MockedDataKey | undefined;

    if (!endpointName) {
      throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    const mockData =
      MOCKED_DATA[endpointName]?.[
        userId as keyof (typeof MOCKED_DATA)[MockedDataKey]
      ];

    if (!mockData) {
      throw new Error(
        `No mocked data found for user ${userId} and endpoint ${endpointName}`
      );
    }

    return mockData;
  }

  /**
   * Get data either from mocked data or API based on configuration
   * @param {string} endpoint - The API endpoint
   * @param {number} userId - The user ID
   * @returns {Promise<unknown>} The data from either mock or API
   * @private
   */
  private async getData(endpoint: string, userId: number): Promise<unknown> {
    if (API_CONFIG.USE_MOCKED_DATA) {
      return this.getMockData(endpoint, userId);
    } else {
      return this.fetchData(this.getUrl(endpoint, userId));
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
      const userData = (await this.getData(
        API_CONFIG.ENDPOINTS.USER,
        userId
      )) as UserApiData;

      // Fetch activity data
      const activityData = (await this.getData(
        API_CONFIG.ENDPOINTS.USER_ACTIVITY,
        userId
      )) as ActivityApiData;

      // Fetch average sessions
      const averageSessionsData = (await this.getData(
        API_CONFIG.ENDPOINTS.USER_AVERAGE_SESSIONS,
        userId
      )) as AverageSessionsApiData;

      // Fetch performance data
      const performanceData = (await this.getData(
        API_CONFIG.ENDPOINTS.USER_PERFORMANCE,
        userId
      )) as PerformanceApiData;

      // Combine all data into the format expected by the User constructor
      const completeUserData = {
        ...userData,
        activity: {
          sessions: activityData.sessions,
        },
        averageSessions: {
          sessions: averageSessionsData.sessions,
        },
        performance: {
          kind: performanceData.kind,
          data: performanceData.data,
        },
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
      if (API_CONFIG.USE_MOCKED_DATA) {
        // Check if user exists in the mocked data
        return Object.prototype.hasOwnProperty.call(MOCKED_DATA.USER, userId);
      } else {
        // Check if user exists in the API
        await this.fetchData(this.getUrl(API_CONFIG.ENDPOINTS.USER, userId));
        return true;
      }
    } catch {
      return false;
    }
  }
}

export default UserService.getInstance();

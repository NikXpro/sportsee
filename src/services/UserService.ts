import { API_CONFIG } from "../config/api.config";
import User from "../models/User";

class UserService {
  private static instance: UserService;
  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private getUrl(endpoint: string, id: number): string {
    return `${API_CONFIG.BASE_URL}${endpoint.replace(":id", id.toString())}`;
  }

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
   * Retrieves all user data
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
   * Checks if a user exists
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

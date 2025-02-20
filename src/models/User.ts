import UserActivity from "./UserActivity";
import UserAverageSessions from "./UserAverageSessions";
import UserPerformance from "./UserPerformance";
import UserScore from "./UserScore";

/**
 * Represents user's personal information
 */
interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

/**
 * Represents user's key nutritional data
 */
interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

/**
 * Represents the complete user data structure received from the API
 */
interface UserData {
  id: number;
  userInfos: UserInfos;
  score?: number;
  todayScore?: number;
  keyData: KeyData;
  activity: {
    sessions: {
      day: string;
      kilogram: number;
      calories: number;
    }[];
  };
  averageSessions: {
    sessions: {
      day: number;
      sessionLength: number;
    }[];
  };
  performance: {
    kind: { [key: number]: string };
    data: {
      value: number;
      kind: number;
    }[];
  };
}

/**
 * Class representing a user with their associated fitness and nutritional data
 */
export default class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  keyData: KeyData;
  activity: UserActivity;
  averageSessions: UserAverageSessions;
  performance: UserPerformance;
  score: UserScore;

  /**
   * Creates a new User instance
   * @param data - The user data received from the API
   */
  constructor(data: UserData) {
    this.id = data.id;
    this.firstName = data.userInfos.firstName;
    this.lastName = data.userInfos.lastName;
    this.age = data.userInfos.age;
    this.keyData = data.keyData;

    // Initialisation des sous-modèles
    this.activity = new UserActivity(data.activity);
    this.averageSessions = new UserAverageSessions(data.averageSessions);
    this.performance = new UserPerformance(data.performance);
    this.score = new UserScore(data);
  }

  /**
   * Returns the user's full name
   * @returns A string containing the user's first and last name
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Returns the user's key nutritional data
   * @returns An object containing calories, proteins, carbohydrates, and lipids counts
   */
  getNutritionalData(): KeyData {
    return this.keyData;
  }

  /**
   * Returns formatted data for the activity chart
   * @returns Formatted data for displaying the daily activity chart
   */
  getActivityChartData() {
    return this.activity.getChartData();
  }

  /**
   * Returns formatted data for the average sessions chart
   * @returns Formatted data for displaying the average sessions duration chart
   */
  getAverageSessionsChartData() {
    return this.averageSessions.getChartData();
  }

  /**
   * Returns formatted data for the performance chart
   * @returns Formatted data for displaying the performance radar chart
   */
  getPerformanceChartData() {
    return this.performance.getChartData();
  }

  /**
   * Returns formatted data for the score chart
   * @returns Formatted data for displaying the score chart
   */
  getScoreChartData() {
    return this.score.getChartData();
  }
}

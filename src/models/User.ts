import UserActivity from "./UserActivity";
import UserAverageSessions from "./UserAverageSessions";
import UserPerformance from "./UserPerformance";
import UserScore from "./UserScore";

/**
 * Represents user's personal information
 * @interface UserInfos
 */
interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

/**
 * Represents user's key nutritional data
 * @interface KeyData
 */
interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

/**
 * Represents the complete user data structure received from the API
 * @interface UserData
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
 * Manages all user-related data including personal information, activity tracking,
 * performance metrics, and nutritional information
 */
export default class User {
  /** Unique identifier for the user */
  id: number;

  /** User's first name */
  firstName: string;

  /** User's last name */
  lastName: string;

  /** User's age */
  age: number;

  /** User's nutritional information including calories, proteins, carbs, and lipids */
  keyData: KeyData;

  /** User's daily activity tracking data */
  activity: UserActivity;

  /** User's average session duration data */
  averageSessions: UserAverageSessions;

  /** User's performance data across different categories */
  performance: UserPerformance;

  /** User's overall score/completion data */
  score: UserScore;

  /**
   * Creates a new User instance
   * @param {UserData} data - The complete user data received from the API
   * @throws {Error} Will throw an error if required data is missing or invalid
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
   * @returns {string} A string containing the user's first and last name concatenated
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Returns the user's key nutritional data
   * @returns {KeyData} An object containing detailed nutritional information:
   * - calorieCount: Daily calorie intake
   * - proteinCount: Daily protein intake in grams
   * - carbohydrateCount: Daily carbohydrate intake in grams
   * - lipidCount: Daily lipid intake in grams
   */
  getNutritionalData(): KeyData {
    return this.keyData;
  }

  /**
   * Returns formatted data for the activity chart
   * @returns {Object[]} Array of daily activity records containing:
   * - day: The date of the activity
   * - kilogram: Weight measurement
   * - calories: Calories burned
   */
  getActivityChartData() {
    return this.activity.getChartData();
  }

  /**
   * Returns formatted data for the average sessions chart
   * @returns {Object[]} Array of session records containing:
   * - day: Day of the week (1-7)
   * - sessionLength: Duration of the session in minutes
   */
  getAverageSessionsChartData() {
    return this.averageSessions.getChartData();
  }

  /**
   * Returns formatted data for the performance chart
   * @returns {Object[]} Array of performance metrics for different categories
   * with values normalized for radar chart display
   */
  getPerformanceChartData() {
    return this.performance.getChartData();
  }

  /**
   * Returns formatted data for the score chart
   * @returns {Object[]} Formatted score data for circular progress chart display
   */
  getScoreChartData() {
    return this.score.getChartData();
  }
}

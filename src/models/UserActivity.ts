/**
 * Represents a single activity session with weight and calories data
 * @interface Session
 * @property {number} day - The day number of the session
 * @property {number} kilogram - User's weight in kilograms for that day
 * @property {number} calories - Calories burned during that day
 */
interface Session {
  day: number;
  kilogram: number;
  calories: number;
}

/**
 * Raw activity data structure received from the API
 * @interface UserActivityData
 * @property {Object[]} sessions - Array of daily activity records
 * @property {string} sessions.day - The date of the activity session
 * @property {number} sessions.kilogram - Weight measurement in kilograms
 * @property {number} sessions.calories - Calories burned during the session
 */
interface UserActivityData {
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  }[];
}

/**
 * Data structure formatted for the activity chart display
 * @interface ChartData
 * @property {string} name - Display name for the data point (day)
 * @property {number} kilogram - Weight measurement to display
 * @property {number} calories - Calories value to display
 */
interface ChartData {
  name: string;
  kilogram: number;
  calories: number;
}

/**
 * Class handling user activity data transformation and formatting
 * Processes raw activity data from the API and provides methods to access
 * formatted data for display in charts and UI components
 */
export default class UserActivity {
  /**
   * Array of processed activity sessions
   * @type {Session[]}
   */
  sessions: Session[];

  /**
   * Creates a new UserActivity instance
   * @param {UserActivityData} data - Raw activity data from the API
   * @throws {Error} Will throw an error if the data format is invalid
   */
  constructor(data: UserActivityData) {
    this.sessions = data.sessions.map((session) => ({
      day: parseInt(session.day),
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }

  /**
   * Returns formatted data for the activity chart
   * Transforms the session data into a format suitable for chart display
   * @returns {ChartData[]} Array of chart-ready data points containing:
   * - name: The day of activity as a string
   * - kilogram: The weight measurement for that day
   * - calories: The calories burned that day
   */
  getChartData(): ChartData[] {
    return this.sessions.map((session) => ({
      name: session.day.toString(),
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }
}

/**
 * Represents a single activity session with weight and calories data
 */
interface Session {
  day: number;
  kilogram: number;
  calories: number;
}

/**
 * Raw activity data structure received from the API
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
 */
interface ChartData {
  name: string;
  kilogram: number;
  calories: number;
}

/**
 * Class handling user activity data transformation and formatting
 */
export default class UserActivity {
  /** Array of processed activity sessions */
  sessions: Session[];

  /**
   * Creates a new UserActivity instance
   * @param data Raw activity data from the API
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
   * @returns Array of chart-ready data points
   */
  getChartData(): ChartData[] {
    return this.sessions.map((session) => ({
      name: session.day.toString(),
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }
}

/**
 * Interface representing a single session data point
 * @interface Session
 * @property {number} day - Day of the week (1-7, where 1 is Monday)
 * @property {number} sessionLength - Duration of the session in minutes
 */
interface Session {
  day: number;
  sessionLength: number;
}

/**
 * Interface for the raw data structure received from the API
 * @interface UserAverageSessionsData
 * @property {Object[]} sessions - Array of session records
 * @property {number} sessions.day - Day of the week (1-7)
 * @property {number} sessions.sessionLength - Session duration in minutes
 */
interface UserAverageSessionsData {
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}

/**
 * Class handling the average session length data for a user
 * Processes and formats data for the line chart display
 * Includes functionality to add virtual data points for smoother chart rendering
 */
export default class UserAverageSessions {
  /**
   * Array of processed session records
   * @type {Session[]}
   */
  sessions: Session[];

  /**
   * Creates a new UserAverageSessions instance
   * @param {UserAverageSessionsData} data - Raw session data from the API
   * @throws {Error} Will throw an error if the data format is invalid
   */
  constructor(data: UserAverageSessionsData) {
    this.sessions = data.sessions.map((session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    }));
  }

  /**
   * Prepares data for the line chart by adding virtual points
   * Adds virtual data points before the first and after the last real data points
   * to create a smoother line chart visualization
   *
   * @returns {Session[]} Array of sessions including:
   * - Virtual point before day 1 (day 0)
   * - Actual session data points (days 1-7)
   * - Virtual point after day 7 (day 8)
   */
  getChartData(): Session[] {
    // Add virtual points before and after for better rendering
    const virtualData = [
      { day: 0, sessionLength: this.sessions[0].sessionLength - 5 },
      ...this.sessions,
      {
        day: 8,
        sessionLength:
          this.sessions[this.sessions.length - 1].sessionLength + 10,
      },
    ];
    return virtualData;
  }
}

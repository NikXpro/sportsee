/**
 * Interface representing a single session data point
 */
interface Session {
  day: number;
  sessionLength: number;
}

/**
 * Interface for the raw data structure received from the API
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
 */
export default class UserAverageSessions {
  sessions: Session[];

  /**
   * Creates a new UserAverageSessions instance
   * @param data - Raw session data from the API
   */
  constructor(data: UserAverageSessionsData) {
    this.sessions = data.sessions.map((session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    }));
  }

  /**
   * Prepares data for the line chart by adding virtual points
   * @returns Array of sessions with virtual points for smoother chart rendering
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

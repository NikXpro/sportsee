/**
 * Interface for the raw score data structure received from the API
 * @interface ScoreData
 * @property {number} [score] - User's score as a decimal between 0 and 1
 * @property {number} [todayScore] - Alternative field for user's score (same format)
 */
interface ScoreData {
  score?: number;
  todayScore?: number;
}

/**
 * Interface defining the structure for radial chart data
 * @interface ChartData
 * @property {number} value - The percentage value to display (0-100)
 * @property {string} fill - The color to use for this segment (hex format)
 */
interface ChartData {
  value: number;
  fill: string;
}

/**
 * Class handling the user's score/today score data
 * Processes and formats data for the radial chart display
 * Handles the conversion of decimal scores to percentages and
 * provides formatted data for the radial progress chart
 */
export default class UserScore {
  /**
   * The user's score as a percentage (0-100)
   * @type {number}
   */
  score: number;

  /**
   * Creates a new UserScore instance
   * @param {ScoreData} data - Raw score data from the API
   * @throws {Error} Will throw an error if both score and todayScore are undefined
   */
  constructor(data: ScoreData) {
    // API can return either score or todayScore
    this.score = (data.score || data.todayScore || 0) * 100;
  }

  /**
   * Prepares data for the radial chart
   * Creates an array with two elements:
   * 1. A background element representing 100%
   * 2. The actual score value
   *
   * @returns {ChartData[]} Array containing:
   * - Background element (gray, 100%)
   * - Actual score element (red, user's score percentage)
   */
  getChartData(): ChartData[] {
    return [
      { value: 100, fill: "#f0f0f0" }, // Gray background (100%)
      { value: this.score, fill: "#FF0000" }, // Actual value
    ];
  }
}

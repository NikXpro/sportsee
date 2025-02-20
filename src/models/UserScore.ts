/**
 * Interface for the raw score data structure received from the API
 */
interface ScoreData {
  score?: number;
  todayScore?: number;
}

/**
 * Interface defining the structure for radial chart data
 */
interface ChartData {
  value: number;
  fill: string;
}

/**
 * Class handling the user's score/today score data
 * Processes and formats data for the radial chart display
 */
export default class UserScore {
  score: number;

  /**
   * Creates a new UserScore instance
   * @param data - Raw score data from the API
   */
  constructor(data: ScoreData) {
    // API peut retourner soit score soit todayScore
    this.score = (data.score || data.todayScore || 0) * 100;
  }

  /**
   * Prepares data for the radial chart
   * @returns Array containing background and actual score values
   */
  getChartData(): ChartData[] {
    return [
      { value: 100, fill: "#f0f0f0" }, // Fond gris (100%)
      { value: this.score, fill: "#FF0000" }, // Valeur réelle
    ];
  }
}

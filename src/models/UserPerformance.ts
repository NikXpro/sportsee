/**
 * Interface representing a single performance metric
 * @interface Performance
 * @property {string} subject - The name/category of the performance metric
 * @property {number} value - The numerical value/score for this metric
 */
interface Performance {
  subject: string;
  value: number;
}

/**
 * Interface for the raw performance data structure received from the API
 * @interface UserPerformanceData
 * @property {Object} kind - Mapping of performance category IDs to their labels
 * @property {Object[]} data - Array of performance measurements
 * @property {number} data.value - The performance score
 * @property {number} data.kind - The category ID corresponding to the kind mapping
 */
interface UserPerformanceData {
  kind: {
    [key: number]: string;
  };
  data: {
    value: number;
    kind: number;
  }[];
}

/**
 * Type defining the valid performance categories and their labels
 * Maps numeric keys (1-6) to their corresponding performance category labels
 * @typedef {Object} PerformanceKind
 */
type PerformanceKind = {
  [K in 1 | 2 | 3 | 4 | 5 | 6]: string;
};

/**
 * Class handling the performance data for a user
 * Processes and formats data for the radar chart display
 * Manages the transformation of raw performance data into a format suitable for visualization
 */
export default class UserPerformance {
  /**
   * Array of processed performance metrics
   * @type {Performance[]}
   */
  performances: Performance[];

  /**
   * Static mapping of performance kinds to their display labels in French
   * @type {PerformanceKind}
   * @readonly
   * @private
   */
  private static readonly PERFORMANCE_KINDS: PerformanceKind = {
    1: "Cardio",
    2: "Energie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
  };

  /**
   * Creates a new UserPerformance instance
   * @param {UserPerformanceData} data - Raw performance data from the API
   * @throws {Error} Will throw an error if the data format is invalid or if a performance kind is not recognized
   */
  constructor(data: UserPerformanceData) {
    this.performances = data.data.map((item) => ({
      subject:
        data.kind[item.kind] ||
        UserPerformance.PERFORMANCE_KINDS[item.kind as keyof PerformanceKind],
      value: item.value,
    }));
  }

  /**
   * Returns the formatted performance data for the radar chart
   * @returns {Performance[]} Array of performance metrics ready for radar chart display,
   * each containing a subject (category name) and value (performance score)
   */
  getChartData(): Performance[] {
    return this.performances;
  }
}

/**
 * Interface representing a single performance metric
 */
interface Performance {
  subject: string;
  value: number;
}

/**
 * Interface for the raw performance data structure received from the API
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
 */
type PerformanceKind = {
  [K in 1 | 2 | 3 | 4 | 5 | 6]: string;
};

/**
 * Class handling the performance data for a user
 * Processes and formats data for the radar chart display
 */
export default class UserPerformance {
  performances: Performance[];

  /**
   * Static mapping of performance kinds to their display labels
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
   * @param data - Raw performance data from the API
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
   * @returns Array of performance metrics
   */
  getChartData(): Performance[] {
    return this.performances;
  }
}

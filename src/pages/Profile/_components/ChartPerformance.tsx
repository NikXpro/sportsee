/**
 * @fileoverview Performance radar chart component displaying user's performance metrics
 * @module ChartPerformance
 */

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import "./ChartPerformance.scss";

/**
 * Props for the ChartPerformance component
 * @interface ChartPerformanceProps
 * @property {Object[]} data - Array of performance metrics
 * @property {string} data[].subject - Name of the performance category
 * @property {number} data[].value - Performance value for the category
 */
interface ChartPerformanceProps {
  data: {
    subject: string;
    value: number;
  }[];
}

/**
 * Performance chart component that displays user performance metrics in a radar chart
 * Uses a radar/spider chart to show performance across different categories
 *
 * @component
 * @param {ChartPerformanceProps} props - Component props
 * @param {Object[]} props.data - Array of performance measurements
 * @returns {JSX.Element} The rendered performance radar chart
 *
 * @example
 * ```tsx
 * const data = [
 *   { subject: "Cardio", value: 80 },
 *   { subject: "Energie", value: 70 },
 *   { subject: "Endurance", value: 85 }
 * ];
 *
 * <ChartPerformance data={data} />
 * ```
 */
export function ChartPerformance({ data }: ChartPerformanceProps) {
  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
          <PolarGrid
            radialLines={false}
            gridType="polygon"
            // Radar chart points (on scale 0-90)
            // - Points 1 and 2: fixed at 10 and 20
            // - Points 3 to 5: evenly spaced (gap = (90 - 20) / 3 ~= 23.33)
            polarRadius={[10, 20, 43.335, 66.67, 90]}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#FFFFFF", fontSize: 12 }}
          />
          <Radar
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

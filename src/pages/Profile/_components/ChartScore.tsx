/**
 * @fileoverview Score chart component displaying user's goal completion as a radial progress bar
 * @module ChartScore
 */

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import "./ChartScore.scss";

/**
 * Props for the ChartScore component
 * @interface ChartScoreProps
 * @property {Object[]} data - Array containing background and score data
 * @property {number} data[].value - Percentage value (0-100)
 * @property {string} data[].fill - Color for the radial bar segment
 */
interface ChartScoreProps {
  data: {
    value: number;
    fill: string;
  }[];
}

/**
 * Score chart component that displays the user's goal completion percentage
 * Uses a radial progress bar to show the score, with a background track
 *
 * @component
 * @param {ChartScoreProps} props - Component props
 * @param {Object[]} props.data - Array containing background and score data
 * @returns {JSX.Element} The rendered score chart
 *
 * @example
 * ```tsx
 * const data = [
 *   { value: 100, fill: "#f0f0f0" }, // Background
 *   { value: 75, fill: "#FF0000" }   // Actual score
 * ];
 *
 * <ChartScore data={data} />
 * ```
 */
export function ChartScore({ data }: ChartScoreProps) {
  const score = data[1].value; // The second value is the actual score

  return (
    <div className="score-chart">
      <h2 className="score-title">Score</h2>
      <div className="score-content">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="80%"
            data={data}
            startAngle={90}
            endAngle={450}
            barSize={10}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={100}
              min={0}
              max={100}
              isAnimationActive={true}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="score-label">
          <span className="score-value">{score}%</span>
          <span className="score-text">
            de votre
            <br />
            objectif
          </span>
        </div>
      </div>
    </div>
  );
}

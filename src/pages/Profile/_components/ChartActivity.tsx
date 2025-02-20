/**
 * @fileoverview Activity chart component displaying daily weight and calories data
 * @module ChartActivity
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import "./ChartActivity.scss";

/**
 * Props for the custom tooltip component
 * @interface CustomTooltipProps
 * @extends {TooltipProps<string, string>}
 * @property {boolean} [active] - Whether the tooltip is active
 * @property {Array<{value: string, dataKey: string}>} [payload] - Data for the tooltip
 */
interface CustomTooltipProps extends TooltipProps<string, string> {
  active?: boolean;
  payload?: Array<{
    value: string;
    dataKey: string;
  }>;
}

/**
 * Custom tooltip component for the activity chart
 * Displays weight and calories values
 *
 * @component
 * @param {CustomTooltipProps} props - Component props
 * @returns {JSX.Element | null} The rendered tooltip or null if inactive
 */
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].value}kg`}</p>
        <p>{`${payload[1].value}kCal`}</p>
      </div>
    );
  }
  return null;
};

/**
 * Props for the ChartActivity component
 * @interface ChartActivityProps
 * @property {Object[]} data - Array of daily activity data
 * @property {string} data[].name - Day identifier
 * @property {number} data[].kilogram - Weight measurement for the day
 * @property {number} data[].calories - Calories burned for the day
 */
interface ChartActivityProps {
  data: {
    name: string;
    kilogram: number;
    calories: number;
  }[];
}

/**
 * Activity chart component that displays daily weight and calories data
 * Uses a bar chart to show weight and calories side by side for each day
 *
 * @component
 * @param {ChartActivityProps} props - Component props
 * @param {Object[]} props.data - Array of daily activity measurements
 * @returns {JSX.Element} The rendered activity chart
 *
 * @example
 * ```tsx
 * const data = [
 *   { name: "1", kilogram: 80, calories: 240 },
 *   { name: "2", kilogram: 80, calories: 220 }
 * ];
 *
 * <ChartActivity data={data} />
 * ```
 */
export function ChartActivity({ data }: ChartActivityProps) {
  return (
    <div className="chart-goal">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
        <div className="legend-container">
          <div className="legend-item">
            <span className="dot black"></span>
            <span>Poids (kg)</span>
          </div>
          <div className="legend-item">
            <span className="dot red"></span>
            <span>Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 35,
            right: -20,
            left: 5,
            bottom: 50,
          }}
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="3"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fill: "#9B9EAC" }}
            stroke="#DEDEDE"
            dy={15}
          />
          <YAxis
            yAxisId="left"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
            tickCount={3}
            domain={["dataMin - 1", "dataMax + 1"]}
          />
          <YAxis
            yAxisId="right"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tick={false}
            domain={[0, "dataMax + 100"]}
            hide
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="left"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="right"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

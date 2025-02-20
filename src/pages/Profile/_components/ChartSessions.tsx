/**
 * @fileoverview Average sessions chart component displaying session duration over time
 * @module ChartSessions
 */

import {
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import "./ChartSessions.scss";

/**
 * Custom tooltip component for the sessions chart
 * Displays session duration in minutes
 *
 * @component
 * @param {TooltipProps<number, string>} props - Recharts tooltip props
 * @returns {JSX.Element | null} The rendered tooltip or null if inactive
 */
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-tooltip-item">{`${payload[0].value} min`}</div>
    );
  }
  return null;
};

/**
 * Props for the custom cursor component
 * @interface CustomCursorProps
 * @property {Array<{x: number, y: number}>} points - Cursor position points
 */
interface CustomCursorProps {
  points: Array<{
    x: number;
    y: number;
  }>;
}

/**
 * Custom cursor component that creates a darkening effect
 * on the chart from the cursor position to the right edge
 *
 * @component
 * @param {CustomCursorProps} props - Component props
 * @returns {JSX.Element} The rendered cursor overlay
 */
const CustomCursor = ({ points }: CustomCursorProps) => {
  return (
    <Rectangle
      fill="rgba(0, 0, 0, 0.1)"
      x={points[0].x}
      width={1000}
      height={300}
    />
  );
};

/**
 * Props for the ChartSessions component
 * @interface ChartSessionsProps
 * @property {Object[]} data - Array of session duration data
 * @property {number} data[].day - Day number (1-7)
 * @property {number} data[].sessionLength - Duration of the session in minutes
 */
interface ChartSessionsProps {
  data: {
    day: number;
    sessionLength: number;
  }[];
}

/**
 * Average sessions chart component that displays session durations over the week
 * Uses a line chart with custom styling and interactions
 *
 * @component
 * @param {ChartSessionsProps} props - Component props
 * @param {Object[]} props.data - Array of session measurements
 * @returns {JSX.Element} The rendered sessions chart
 *
 * @example
 * ```tsx
 * const data = [
 *   { day: 1, sessionLength: 30 }, // Monday
 *   { day: 2, sessionLength: 45 }, // Tuesday
 *   // ... rest of the week
 * ];
 *
 * <ChartSessions data={data} />
 * ```
 */
export function ChartSessions({ data }: ChartSessionsProps) {
  /**
   * Formats the day number into a single letter representation
   * @param {number} value - Day number (1-7)
   * @returns {string} Single letter representation of the day
   */
  const formatLabel = (value: number): string => {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    return value >= 1 && value <= 7 ? days[value - 1] : "";
  };

  return (
    <div className="chartaverage-sessions">
      <h3 className="chartaverage-sessions-title">
        Durée moyenne des
        <br />
        sessions
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 60, right: -20, bottom: 20, left: -20 }}
          onMouseMove={(e) => {
            if (e?.activeTooltipIndex) {
              const container = document.querySelector(
                ".chartaverage-sessions"
              );
              if (container instanceof HTMLElement) {
                container.classList.add("active");
              }
            }
          }}
          onMouseLeave={() => {
            const container = document.querySelector(".chartaverage-sessions");
            if (container instanceof HTMLElement) {
              container.classList.remove("active");
            }
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />

              <stop
                offset="81.04%"
                stopColor="#FFFFFF"
                stopOpacity="0.403191"
              />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "rgba(255,255,255,0.5)",
              strokeWidth: 10,
              r: 4,
            }}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "rgba(255,255,255,0.6)",
              fontSize: 12,
            }}
            tickFormatter={formatLabel}
            padding={{ left: 0, right: 0 }}
            dy={10}
          />
          <YAxis hide domain={["dataMin-10", "dataMax+10"]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor points={[]} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

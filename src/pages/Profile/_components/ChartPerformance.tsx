import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import "./ChartPerformance.scss";

interface ChartPerformanceProps {
  data: {
    subject: string;
    value: number;
  }[];
}

export function ChartPerformance({ data }: ChartPerformanceProps) {
  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
          <PolarGrid
            radialLines={false}
            gridType="polygon"
            // Points du graphique radar (sur échelle 0-90)
            // - Points 1 et 2 : fixés a 10 et 20.
            // - Points 3 a 5 : espacés uniformément (écart = (90 - 20) / 3 ~= 23.33).
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

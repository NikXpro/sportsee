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

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-tooltip-item">{`${payload[0].value} min`}</div>
    );
  }
  return null;
};

interface CustomCursorProps {
  points: Array<{
    x: number;
    y: number;
  }>;
}

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

export function ChartSessions() {
  const realData = [
    { day: 1, sessionLength: 30 },
    { day: 2, sessionLength: 40 },
    { day: 3, sessionLength: 35 },
    { day: 4, sessionLength: 30 },
    { day: 5, sessionLength: 45 },
    { day: 6, sessionLength: 55 },
    { day: 7, sessionLength: 68 },
  ];

  // Ajouter des points virtuels avant et après
  const data = [
    { day: 0, sessionLength: realData[0].sessionLength - 5 },
    ...realData,
    { day: 8, sessionLength: realData[realData.length - 1].sessionLength + 10 },
  ];

  const formatLabel = (value: number): string => {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    // Ne montrer que les labels pour les jours réels (1-7)
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

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

interface CustomTooltipProps extends TooltipProps<string, string> {
  active?: boolean;
  payload?: Array<{
    value: string;
    dataKey: string;
  }>;
}

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

interface ChartActivityProps {
  data: {
    name: string;
    kilogram: number;
    calories: number;
  }[];
}

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

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import "./ChartScore.scss";

const data = [{ value: 12 }];

export function ChartScore() {
  return (
    <div className="score-chart">
      <h2 className="score-title">Score</h2>
      <div className="score-content">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="80%"
            barSize={10}
            data={data}
            startAngle={90}
            endAngle={450}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={30}
              fill="#FF0000"
              background={{ fill: "#FBFBFB" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="score-label">
          <span className="score-value">12%</span>
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

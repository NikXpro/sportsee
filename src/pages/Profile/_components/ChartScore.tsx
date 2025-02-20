import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import "./ChartScore.scss";

interface ChartScoreProps {
  data: {
    value: number;
    fill: string;
  }[];
}

export function ChartScore({ data }: ChartScoreProps) {
  const score = data[1].value; // La deuxième valeur est le score réel

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

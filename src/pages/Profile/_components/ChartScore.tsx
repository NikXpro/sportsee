import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import "./ChartScore.scss";

type ChartScoreProps = {
  score: number;
};

export function ChartScore({ score }: ChartScoreProps) {
  return (
    <div className="score-chart">
      <h2 className="score-title">Score</h2>
      <div className="score-content">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="80%"
            data={[
              { value: 100, fill: "#f0f0f0" }, // Fond gris (100%)
              { value: score, fill: "#FF0000" }, // Valeur réelle
            ]}
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

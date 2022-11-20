import StatisticsLine from "./StatisticsLine.js";

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const avg = total === 0 ? "-" : (props.good + props.neutral * 0.5) / total;
  const positive = total === 0 ? 0 : props.good / total;

  return (
    <table>
      <tbody>
        <StatisticsLine description="Good" value={props.good} />
        <StatisticsLine description="Neutral" value={props.neutral} />
        <StatisticsLine description="Bad" value={props.bad} />
        <StatisticsLine description="All" value={total} />
        <StatisticsLine description="Average" value={avg} />
        <StatisticsLine description="Good" value={positive * 100 + "%"} />
      </tbody>
    </table>
  );
};

export default Statistics;

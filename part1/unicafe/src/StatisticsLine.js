const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.value}</td>
    </tr>
  );
};

export default StatisticsLine;

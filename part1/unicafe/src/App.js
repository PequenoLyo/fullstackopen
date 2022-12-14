import { useState } from "react";

import Button from "./Button.js";
import Statistics from "./Statistics.js";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text="good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      {good + neutral + bad === 0 && <p>No feedback given</p>}
      {good + neutral + bad !== 0 && (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

export default App;

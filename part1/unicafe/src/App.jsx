import { useState } from "react";

const Heading = ({ text }) => {
	return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
	return (
		<button type="button" onClick={onClick}>
			{text}
		</button>
	);
};

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text} </td>
			<td>
				{props.value} {props.symbol}
			</td>
		</tr>
	);
};

const Statistics = (props) => {
	if (props.total === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={props.good} />
				<StatisticLine text="neutral" value={props.neutral} />
				<StatisticLine text="bad" value={props.bad} />
				<StatisticLine text="all" value={props.total} />
				<StatisticLine text="average" value={props.average} />
				<StatisticLine text="positive" value={props.positive} symbol={"%"} />
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const total = good + bad + neutral;
	const positive = (good / total) * 100;
	const average = (good - bad) / total;

	const handleGood = () => {
		setGood(good + 1);
	};

	const handleNeutral = () => {
		setNeutral(neutral + 1);
	};

	const handleBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<Heading text="Give feedback" />
			<Button text="good" onClick={handleGood} />
			<Button text="neutral" onClick={handleNeutral} />
			<Button text="bad" onClick={handleBad} />
			<Heading text="Statistics" />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				total={total}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;

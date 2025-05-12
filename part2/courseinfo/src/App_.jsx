const Header = (props) => {
	return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
	return (
		<p>
			{props.name} {props.exercises}
		</p>
	);
};

const Total = ({ total }) => {
	return (
		<p>
			<strong>Total number of exercises {total}</strong>
		</p>
	);
};

const Content = (props) => {
	const parts = props.course.parts.map((part) => (
		<Part key={part.name} name={part.name} exercises={part.exercises} />
	));
	return <>{parts}</>;
};

const Course = (props) => {
	console.log(props);
	return (
		<>
			<Header course={props.course} />
			<Content course={props.course} />
			<Total total={props.total} />
		</>
	);
};

const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

	const parts = course.parts.map((part) => part.exercises);
	const total = parts.reduce((a, b) => a + b);

	return <Course course={course} total={total} />;
};

export default App;

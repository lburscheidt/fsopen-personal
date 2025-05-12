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
			<strong>Total of {total} exercises</strong>
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
	return (
		<>
			<Header course={props.course} />
			<Content course={props.course} />
			<Total total={props.total} />
		</>
	);
};
export default Course;

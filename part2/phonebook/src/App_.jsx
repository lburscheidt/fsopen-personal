import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Filter = ({ filterEntry, handleFilter }) => {
	return (
		<div>
			filter shown with <input value={filterEntry} onChange={handleFilter} />
		</div>
	);
};

const Person = ({ person }) => {
	return (
		<p>
			{person.name} {person.number}
		</p>
	);
};

const Persons = ({ filterNames }) => {
	return (
		<div>
			{filterNames.map((person) => (
				<Person key={person.name} person={person} />
			))}
		</div>
	);
};

const PersonForm = (props) => {
	return (
		<form>
			<div>
				name:{" "}
				<input value={props.newName} onChange={props.handleNewNameChange} />
				<br />
				number :{" "}
				<input value={props.newNumber} onChange={props.handleNewNumberChange} />
			</div>
			<div>
				<button type="submit" onClick={props.addNewName}>
					add
				</button>
			</div>
		</form>
	);
};

const App = () => {
	useEffect(() => {
		console.log("effect");
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterEntry, setFilter] = useState("");

	const addNewName = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
		};
		if (persons.map((person) => person.name).includes(personObject.name)) {
			alert(`${personObject.name} is already in the phonebook`);
		} else {
			axios
				.post("http://localhost:3001/persons", personObject)
				.then((response) => {
					console.log(response);
				});
		}
		setNewName("");
		setNewNumber("");
	};

	const handleNewNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNewNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};

	const filterNames =
		filterEntry !== ""
			? persons.filter((person) =>
					person.name
						.toLowerCase()
						.trim()
						.startsWith(filterEntry.toLowerCase().trim()),
				)
			: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterEntry={filterEntry} handleFilter={handleFilter} />
			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNewNumberChange={handleNewNumberChange}
				handleNewNameChange={handleNewNameChange}
				addNewName={addNewName}
			/>
			<h3>Numbers</h3>
			<Persons filterNames={filterNames} />
		</div>
	);
};

export default App;

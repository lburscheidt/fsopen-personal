import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import personService from "./services/persons";

const ErrorNotification = ({ message }) => {
	if (message === null) {
		return null;
	}

	return <div className="error">{message}</div>;
};

const SuccessNotification = ({ message }) => {
	if (message === null) {
		return null;
	}

	return <div className="success">{message}</div>;
};

const Filter = ({ filterEntry, handleFilter }) => {
	return (
		<div>
			filter shown with <input value={filterEntry} onChange={handleFilter} />
		</div>
	);
};

const Person = ({ person, deletePerson }) => {
	return (
		<p>
			{person.name} {person.number}
			<button
				type="button"
				onClick={() => {
					deletePerson(person.id, person.name);
				}}
			>
				Delete
			</button>
		</p>
	);
};

const Persons = ({ filterNames, deletePerson }) => {
	return (
		<div>
			{filterNames.map((person) => (
				<Person key={person.name} person={person} deletePerson={deletePerson} />
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
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterEntry, setFilter] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const addNewName = (event) => {
		event.preventDefault();
		const personObject = { name: newName, number: newNumber };
		const person = persons.filter((p) => p.name === newName)[0];

		if (persons.map((person) => person.name).includes(personObject.name)) {
			if (
				window.confirm(
					`${personObject.name} is already in the phonebook, replace the old number with a new one?`,
				)
			) {
				personService.update(person.id, personObject).catch((error) => {
					setErrorMessage(
						`Information of ${newName} has already been removed from server`,
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
				setSuccessMessage(`Successfully updated phone number for ${newName}`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				personService.getAll();
			}
		} else {
			personService.create(personObject);
			setPersons(persons.concat(personObject));
			setSuccessMessage(`Successfully added ${newName}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}

		setNewName("");
		setNewNumber("");
	};

	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService.deleted(id);
			setPersons(
				persons.filter((person) => {
					return person.id !== id;
				}),
			);
		}
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
			<ErrorNotification message={errorMessage} />
			<SuccessNotification message={successMessage} />
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
			<Persons filterNames={filterNames} deletePerson={deletePerson} />
		</div>
	);
};
export default App;

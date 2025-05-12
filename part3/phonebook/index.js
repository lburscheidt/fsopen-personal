const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.use(express.json());
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body ",
	),
);

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
	response.send(
		`Phonebook has info for ${persons.length} people<br />${new Date()}`,
	);
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

const generateId = () => {
	const maxId =
		persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
	return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
	const body = request.body;
	console.log(persons);
	if (!body.name) {
		return response.status(400).json({
			error: "name is missing",
		});
	}
	if (!body.number) {
		return response.status(400).json({
			error: "number is missing",
		});
	}
	if (persons.some((person) => person.name === body.name)) {
		return response.status(400).json({
			error: "name already exists in phonebook",
		});
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number || "02081235877",
	};

	persons = persons.concat(person);

	response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});

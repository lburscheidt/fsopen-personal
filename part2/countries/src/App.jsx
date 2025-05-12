import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const Filter = ({ value, onChange }) => {
	return (
		<label>
			find countries
			<input value={value} onChange={onChange} />
		</label>
	);
};

const Countries = () => {};

function App() {
	const [country, setCountry] = useState("");
	const [foundCountries, setFoundCountries] = useState([]);
	const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`;

	useEffect(() => {
		console.log("effect");
		axios.get(url).then((response) => {
			console.log("promise fulfilled");
			setFoundCountries(response.data);
		});
	}, [url]);
	console.log(foundCountries);

	const handleInputChange = (event) => {
		setCountry(event.target.value);
		console.log(country);
	};

	return (
		<>
			<div>
				<Filter value={country} onChange={handleInputChange} />
			</div>
		</>
	);
}

export default App;

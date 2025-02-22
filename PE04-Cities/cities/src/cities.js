import React, { useState } from 'react';
import { BrowserRouter as  Router, Routes, Route, Link, useNavigate, useParams} from 'react-router-dom';
import "./cities.css"

function CitiesList({ cities }) { // function for cities list
    let cityElements = [];
    for (let i = 0; i < cities.length; i++) {
        cityElements.push(
            <div key={cities[i].id}>
                <Link to={`/cities/${cities[i].id}`}>{cities[i].name}</Link>
            </div>
        );
    }
    return (
        <div>
            <h2>Cities List</h2>
            {cityElements}
        </div>
    );
}
function CityDetails({ cities }) { // function to display city details
    const { id } = useParams();
    let city = null;
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].id == parseInt(id)) {
            city = cities[i];
            break;
    }
}
    return (
        <div>
        <h2>{city.name} Details</h2>
        <p>Country: {city.country}</p>
        <p>Population: {city.population}</p>
        </div>
    );
}
function AddCity({ cities, setCities }) { // function to add a new city
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [population, setPopulation] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        const newCity = { id: cities.length + 1, name, country, population };
        setCities([cities, newCity]);
        navigate('/cities');
    }
    return (
        <div>
        <h2>Add City</h2>
        <div>
        <label>Name:</label>
        <input value={name} onChange={(event) => setName(event.target.value)} required />
        <br/>
        <label>Country:</label>
        <input value={country} onChange={(event) => setCountry(event.target.value)} required />
        <br/>
        <label>Population:</label>
        <input value={population} onChange={(event) => setPopulation(event.target.value)} required />
        <br/>
        <button onClick={handleSubmit}>Add City</button>
        </div>
        </div>
    );
}
function App() {
    const [cities, setCities] = useState([]); // useState to hold list of cities
    return (
        <Router>
            <div>
            <h1>Cities Application</h1>
            <nav>
            <Link to="/cities">Cities List</Link>      
            <Link to="/add-city">Add City</Link>
            </nav>
            <Routes>
            <Route path="/cities" element={<CitiesList cities={cities} />} />
            <Route path="/cities/:id" element={<CityDetails cities={cities} />} />
            <Route path="/add-city" element={<AddCity cities={cities} setCities={setCities} />} />
            </Routes>
            </div>
        </Router>
    );
}
export default App;

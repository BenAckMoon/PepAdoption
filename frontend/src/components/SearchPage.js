import React, { useState } from "react";
import './components.css/SearchPage.css'


function SearchPage() {
  const [searchType, setSearchType] = useState('basic');

  // Basic search 
  const [animalType, setAnimalType] = useState('');

  // Advanced search 
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');

  const [results, setResults] = useState([]);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const handleAdoptionStatusChange = (event) => {
    setAdoptionStatus(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          petType: animalType,
          petStatus: adoptionStatus,
          petName: name,
          petHeight: size,
          petWeight: weight
        })
      });
      const results = await response.json();
      setResults(results);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <label className="search-label">
          Search Type:
          <select value={searchType} onChange={handleSearchTypeChange}  className="search-select">
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        {searchType === 'basic' ? (
          <div className="search-fields">
            <label className="search-label">
              Animal Type:
              <select value={animalType} onChange={handleAnimalTypeChange}  className="search-select">
                <option value="">All</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </label>
          </div>
        ) : (
          <div className="search-fields">
            <label className="search-label">
              Adoption Status:
              <select value={adoptionStatus} onChange={handleAdoptionStatusChange} className="search-select">
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </select>
            </label>
            <label className="search-label">
              Size:
              <input type="text" value={size} onChange={handleSizeChange} className="search-input"/>
            </label>
            <label className="search-label">
              Weight:
              <input type="text" value={weight} onChange={handleWeightChange}  className="search-input"/>
            </label>
            <label className="search-label">
              Name:
              <input type="text" value={name} onChange={handleNameChange}  className="search-input"/>
            </label>
          </div>
        )}
        <button type="submit">Search</button>
      </form>

      
      {/* Affichage des résultats */}
      {results.length > 0 && (
        <div>
          <h2>Results </h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Animal Type</th>
                <th>Adoption Status</th>
                <th>Size</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.name}</td>
                  <td>{result.animalType}</td>
                  <td>{result.adoptionStatus}</td>
                  <td>{result.size}</td>
                  <td>{result.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {searchType === 'basic' ? (
      <div>
        <h2>Basic Search</h2>
        <p>Animal Type: {animalType || 'All'}</p>
      </div>
    ) : (
      <div>
        <h2>Advanced Search</h2>
        <p>Adoption Status: {adoptionStatus || 'All'}</p>
        <p>Size: {size || 'All'}</p>
        <p>Weight: {weight || 'All'}</p>
        <p>Name: {name || 'All'}</p>
      </div>
    )}
    </div>
  );
}

export default SearchPage;

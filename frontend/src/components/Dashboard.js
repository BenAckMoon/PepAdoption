
import React, { useState, useEffect } from 'react';
import './components.css/Dashboard.css'

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchPet, setSearchPet] = useState(null);

  useEffect(() => {
  // Fetch all users
    fetch('http://localhost:3001/user/admin/allusers')
      .then(response => response.json())
      .then(data => setUsers(data));

  // Fetch all pets
    fetch('http://localhost:3001/pet/admin/allpets')
      .then(response => response.json())
      .then(data => setPets(data));
  }, []);

  // Function to fetch user by ID
  async function fetchUserById(id) {
    const response = await fetch(`http://localhost:3001/user/admin/allusers/${id}`);
    const data = await response.json();
    return data;
  }
  // Function to fetch pet by ID
  async function fetchPetById(id) {
    const response = await fetch(`http://localhost:3001/pet/admin/allpets/${id}`);
    const data = await response.json();
    return data;
  }


  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Users</h2>
      <label> User ID:
           <input type="text" value={searchUserId} onChange={e => setSearchUserId(e.target.value)} />
         </label>
      <button onClick={async () => {
        const searchUserId = await fetchUserById(pets[0].id);
        setSearchUserId(searchUserId);
      }}> Search User</button>

      <ul> {users.map(user => (<li key={user.id}> {user.name} ({user.email})
      <ul> {user.pets.map(pet => (<li key={pet.id}>{pet.name} ({pet.type})
      </li>
        ))}
      </ul>
          {searchedUser && (
        <div>
          <h3>Results User</h3>
          <p>Name: {searchedUser.name}</p>
          <p>Email: {searchedUser.email}</p>
        </div>)}
        </li>
        ))}
      </ul>

      <h2>Pets</h2>
      <ul> {pets.map(pet => (<li key={pet.id}> {pet.name} ({pet.type})
        <button onClick={() => window.location.href = `/admin/allpets/${pet.id}`}>Edit</button></li>))}
      </ul>
      <label> Pet ID:
      <input type="text" value={searchPet} onChange={e => setSearchPet(e.target.value)} />
      </label>
      <button onClick={async () => {
        const searchPet = await fetchPetById(pets[0].id);
        setSearchPet(searchPet);
      }}> Search Pet</button>

      {searchPet && (
        <div>
          <h3>Results Pet</h3>
          <p>Name: {searchPet.name}</p>
          <p>Type: {searchPet.type}</p>
          <p>Age: {searchPet.age}</p>
          <p>Breed: {searchPet.breed}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

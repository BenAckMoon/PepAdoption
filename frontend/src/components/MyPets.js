import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css/MyPets.css'

function MyPets() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [showRegistered, setShowRegistered] = useState(false);


  useEffect(() => {
    const fetchUserPets = async () => {
      const updatedUsers = await Promise.all(users.map(async user => {
        const response = await fetch(`http://localhost:3002/user/${user.id}/mypets`);
        const pets = await response.json();
        return { ...user, pets };
      }));
      setUsers(updatedUsers);
    };
    fetchUserPets();
  }, [users]);

  function PetCard({ pet }) {
    return (
      <div>
        <img src={pet.imageUrl} alt={pet.name} />
        <h2>{pet.name}</h2>
        <p>Status: {pet.status}</p>
        <button>See More</button>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>My Pets</h1>
      </header>
      <button onClick={() => setShowRegistered(!showRegistered)}>
        {showRegistered ? 'My Pets' : 'Registered Pets'}
      </button>
      {pets.length === 0 && (
        <p>You don't currently own or foster any pets.</p>
      )}
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}



export default MyPets;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './components.css/PetList.css'

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('www.localhost:4000/pet')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error(error));
  }, []);

  const updatePet = async (id, updates) => {
    try {
      const response = await fetch(`www.localhost:4000/pet/:id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      console.log(data);
      setPets((prevState) =>
        prevState.map((pet) => (pet.id === data.id ? data : pet))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePet = async (id, updates) => {
    await updatePet(id, updates);
  };

  return (
    <div>
      <h2>Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
            <button
              onClick={() =>
                handleUpdatePet(pet.id, {
                  type: 'Updated Type',
                  name: 'Updated Name',
                  status: 'Updated Status',
                  picture: 'Updated Image',
                  height: 'Updated Height',
                  weight: 'Updated Weight',
                  color: 'Updated Color',
                  bio: 'Updated Bio',
                  hypoallergenic: 'Updated Hypoallergenic',
                  dietaryRestrictions: 'Updated DietaryRestrictions',
                  breed: 'Updated Breed',
                }) }>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;

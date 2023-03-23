import React, { useState, useEffect } from 'react';
import './components.css/PetDetail.css'


function PetDetails(props) {
  const [pet, setPet] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    fetch(`/pet/${props.match.params.id}`)
      .then(response => response.json())
      .then(data => setPet(data));
  }, [props.match.params.id]);
  
  function handleAdoptClick() {
    alert('Thanks for adopting ' + pet.name + '!');
  }
  
  function handleFavoriteClick() {
    alert('Added ' + pet.name + ' to favorites!');
    setIsSaved(true);
  }
  
  function handleUnfavoriteClick() {
    alert('Removed ' + pet.name + ' from favorites!');
    setIsSaved(false);
  }
  
  if (!pet) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{pet.name}</h1>
      <img src={pet.photo} alt={pet.name} />
      <p>Type: {pet.type}</p>
      <p>Status: {pet.status}</p>
      <p>Size: {pet.size}</p>
      <p>Weight: {pet.weight}</p>
      <p>Color: {pet.color}</p>
      <p>Bio: {pet.bio}</p>
      <p>Hypoallergenic: {pet.hypoallergenic ? 'Yes' : 'No'}</p>
      <p>Food restrictions: {pet.food_restrictions}</p>
      <p>Breed: {pet.breed}</p>
      {pet.owner === props.currentUser ? (
        <button onClick={() => handleAdoptClick()}>Return to Adoption Center</button>
      ) : (
        <div>
          <button onClick={() => handleAdoptClick()}>Adopt</button>
          {isSaved ? (
            <button onClick={() => handleUnfavoriteClick()}>Remove from Favorites</button>
          ) : (
            <button onClick={() => handleFavoriteClick()}>Add to Favorites</button>
          )}
        </div>
      )}
    </div>
  );
}

export default PetDetails;

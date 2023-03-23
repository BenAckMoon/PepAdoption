import React, { useState } from 'react';
import './components.css/AddPetForm.css'
// import LoginForm from './LoginForm';

function AddPetForm() {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [image, setImage] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [bio, setBio] = useState('');
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('adoptionStatus', adoptionStatus);
      formData.append('image', image);
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('color', color);
      formData.append('bio', bio);
      formData.append('hypoallergenic', hypoallergenic);
      formData.append('dietaryRestrictions', dietaryRestrictions);
      formData.append('breed', breed);

      const response = await fetch('http://localhost:3002/pet/create', {
        method: 'POST',
        body: JSON.stringify({ 
          type,
          name, 
          adoptionStatus, 
          image, 
          height,
          weight,
          color,
          bio,
          hypoallergenic,
          dietaryRestrictions,
          breed 
        }),
      });

      const data = await response.json();
      console.log(data);

      setName('');
      setType('');
      setImage("");
      setAdoptionStatus('');
      setHeight('');
      setWeight('');
      setColor('');
      setBio('');
      setHypoallergenic('');
      setDietaryRestrictions('');
      setBreed('');

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <h1>Add a New Pet</h1>
      <div>
      
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input type="text"  value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Adoption Status:
          <input type="text" value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)} />
        </label>
        <label>
          Picture:
          <input type="file" value={image} onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <label>
          Height:
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label>
          Weight:
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label>
          Color:
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Hypoallergenic:
          <input type="checkbox" checked={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.checked)} />
        </label>
        <label>
          Dietary restrictions:
          <input type="text" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} />
        </label>
        <label>
          Breed:
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </label>
        <button type="submit">Add New Pet</button>
      </form>
    
    
    </div>
  </div>
);

    }

 

export default AddPetForm;



//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch('http://localhost:3002/pet/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ 
//         petBio: bio,
//         pet_status: adoptionStatus,
//         pet_breed: breed,
//         pet_color: color,
//         pet_dietary: dietaryRestrictions,
//         pet_hypoallergenic: hypoallergenic,
//         petImage: picture,
//         pet_type: type,
//         pet_height: height,
//         pet_name: name,
//         pet_weight: weight
//       }),
//     })
//     .then(response => {
//       console.log(response.data);
//       })
//       .catch(error => {
//       console.error(error);
//       });
//       };
//   }

//   function handleTypeChange(event) {
//     setType(event.target.value);
//   }
//   function handleNameChange(event) {
//     setName(event.target.value);
//   }
//   function handleAdoptionStatusChange(event) {
//     setAdoptionStatus(event.target.value);
//   }
//   function handlePictureChange(event) {
//     setPicture(event.target.value);
//   }
//   function handleHeightChange(event) {
//     setHeight(event.target.value);
//   }
//   function handleWeightChange(event) {
//     setWeight(event.target.value);
//   }
//   function handleColorChange(event) {
//     setColor(event.target.value);
//   }
//   function handleBioChange(event) {
//     setBio(event.target.value);
//   }
//   function handleHypoallergenicChange(event) {
//     setHypoallergenic(event.target.value);
//   }
//   function handleDietaryRestrictionsChange(event) {
//     setDietaryRestrictions(event.target.value);
//   }
//   function handleBreedChange(event) {
//     setBreed(event.target.value);
//   }

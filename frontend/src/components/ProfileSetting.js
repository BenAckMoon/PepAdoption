import React, { useState } from 'react';
import './components.css/ProfileSetting.css'

function ProfileSettings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [bio, setBio] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = '641959d8ad1a99e8c2c1a0b9';
    const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));
    fetch(`http://localhost:3002/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formDataJson
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save profile changes');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert('Profile changes saved successfully');
      } else {
        throw new Error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
      alert(error.message || 'Failed to save profile changes');
    });
  };
  


  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Profile Settings</h2>
      <label> Email:
        <input type="email" value={email}
          onChange={(event) => setEmail(event.target.value)}/>
      </label>
      <br />
      <label> Password:
        <input type="password" value={password}
          onChange={(event) => setPassword(event.target.value)}/>
      </label>
      <br />
      <label> First Name:
        <input type="text" value={firstName}
          onChange={(event) => setFirstName(event.target.value)}/>
      </label>
      <br />
      <label> Last Name:
        <input type="text" value={lastName}
          onChange={(event) => setLastName(event.target.value)}/>
      </label>
      <br />
      <label>Mobile:
        <input type="tel" value={mobile}
          onChange={(event) => setMobile(event.target.value)}/>
      </label>
      <br />
      <label> Bio:
        <textarea value={bio} onChange={(event) => setBio(event.target.value)}/>
      </label>
      <br />
      <button type="submit">Save Changes</button>
      {/* <button type="button" onClick={handleDeleteUser}>Delete Account</button> */}
    </form>
  );
}

export default ProfileSettings;

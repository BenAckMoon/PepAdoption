import React, { useState } from 'react';
import './components.css/HomePage.css'

function HomePage({ userName, handleLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <header>
        <h1>Welcome {userName}!</h1>
      </header>
      <button onClick={() => handleLogout()}>Logout</button>
      <p><a href="/my-pets">Go to my pets page</a></p>
      <p><a href="/profile">Profile</a></p>
      <button onClick={() => setIsModalOpen(true)}>Search</button>
      {isModalOpen && (
        <div>
          <h2>Search </h2>
          <form>
            <label htmlFor="searchInput"></label>
            <input type="text" id="searchInput" />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;

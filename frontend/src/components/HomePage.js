import React, { useState } from 'react';
import './components.css/HomePage.css'

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div>
      <header>
        <h1>Welcome to the Adopt a Pet' site</h1>
        <h3>Would you like to adopt an animal from one of our partner shelters? </h3><h3>Your decision has serious consequences for our animal friends. Find the links of the candidates for adoption</h3>
      </header>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => setIsModalOpen(true)}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      )}
      {isLoggedIn}
      <p><a href="/search">Go to search page</a></p>
      {isModalOpen && (
        <div>
          <button onClick={() => setIsSignUp(false)}>Login</button>
          <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          {isSignUp ? (
            <SignUpForm onSignUp={handleLogin} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </div>
      )}
    </div>
  );
}


function SignUpForm({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3002/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email,
        password, 
        firstName, 
        lastName, 
        mobile 
      }),
    })
      .then(response => response.json())
      .then(data => {
        onSignUp(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  function handleMobileChange(event) {
    setMobile(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
      <input type="tel" placeholder="Mobile" value={mobile} onChange={handleMobileChange} />
      <button type="submit">Sign Up</button>
    </form>
 );
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3002/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { email, 
          password }),
    })
      .then((response) => response.json())
      .then((data) => {
        onLogin(data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });    ;
  }

  return (
    <form onSubmit={handleSubmit}>
<input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
<input type="password" placeholder="Password" value={password}  onChange={(event) => setPassword(event.target.value)}/>
<button type="submit">Login</button>
    </form>
  );
}

export default HomePage;

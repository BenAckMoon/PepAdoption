import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3002/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        onLogin(data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email}
      onChange={(event) => setEmail(event.target.value)}/>
      <input type="password" placeholder="Password" value={password}
        onChange={(event) => setPassword(event.target.value)}/>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

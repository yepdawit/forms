import React, { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const isValid = formValidation();
    if (!isValid) return;

    try {
      const result = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await result.json();
      if (data.success) {
        setToken(data.token);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while submitting the form");
      setToken(null);
    }
  }

  function formValidation() {
    let message = "";
    if (!username) {
      message += "Please enter a username. ";
    } else if (username.length < 6 || username.length > 18) {
      message += "Username must be between 6 and 18 characters. ";
    }
    if (!password) {
      message += "Please enter a password. ";
    } else if (password.length < 8) {
      message += "Password must be at least 8 characters long. ";
    }

    setError(message);
    return !message; // Returns true if there's no error message.
  }

  return (
    <>
      <h1>Sign up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br></br>
        <label>
          Password:
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

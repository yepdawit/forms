import React, { useState } from "react";

export default function Authentication({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Authenticate</h1>
      <button className="auth" onClick={handleClick}>
        Authenticate with token
      </button>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
    </>
  );
}

import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";

import Authentication from "./components/Authenticate";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>Sign up</h1>
      {token && <p>Token: {token}</p>}
      <SignUpForm setToken={setToken} />
      <Authentication token={token} />
    </>
  );
}

import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseDetails";

function Auth({ onUserChange }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let userCredential;
      if (isRegister) {
        // Register new user
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onUserChange(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>{isRegister ? "Register New Account" : "Sign In to Frame Your Thoughts"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">{isRegister ? "Register" : "Sign In"}</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)} style={{color: "blue", background: "none", border: "none", cursor: "pointer", textDecoration: "underline"}}>
          {isRegister ? "Sign In" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
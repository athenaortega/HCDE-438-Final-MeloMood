import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
import PastEntries from "./pages/PastEntries";
import Profile from "./pages/Profile";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <div className="app">
      <Navbar />
      {!user ? (
        <Routes>
          <Route path="*" element={<Auth onUserChange={setUser} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/new-entry" element={<NewEntry user={user} onAddEntry={addEntry} />} />
          <Route path="/entries" element={<PastEntries entries={entries} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
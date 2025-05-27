import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
import PastEntries from "./pages/PastEntries";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import "./App.css";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]); 

  if (!user) {
    return <Auth onUserChange={setUser} />;
  }

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route
            path="/new-entry"
            element={<NewEntry user={user} onAddEntry={addEntry} />}
          />
          <Route
            path="/entries"
            element={<PastEntries entries={entries} />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

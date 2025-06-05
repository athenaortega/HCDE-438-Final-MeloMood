import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/new-entry" style={styles.link}>Reflect on Art</Link>
        <Link to="/entries" style={styles.link}>Past Entries</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 3rem",
    background: "#EADAD5",
    borderBottom: "1px solid #ddd",
    fontFamily: "'Quicksand', sans-serif",  // <--- here
  },
  links: {
    display: "flex",
    gap: "3rem", 
    justifyContent: "flex-end",
    flexGrow: 2,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    fontFamily: "'Quicksand', sans-serif",  
  },
};


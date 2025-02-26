import React from "react";
import { Link } from "react-router-dom";
import "./../style.css"; // Ensure styles are applied

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/cars">🚗 Cars</Link>
      <Link to="/champions">🏆 Champions</Link>
      <Link to="/circuits">🏟️ Circuits</Link>
      <Link to="/drivers">👨‍✈️ Drivers</Link>
      <Link to="/pole-positions">⏱️ Pole Positions</Link>
      <Link to="/race-results">📊 Race Results</Link>
      <Link to="/races">🏁 Races</Link>
      <Link to="/schedule">📅 Schedule</Link>
      <Link to="/standings">📈 Standings</Link>
      <Link to="/teams">🏎️ Teams</Link>
    </nav>
  );
};

export default Navbar;

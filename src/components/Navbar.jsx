import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import "./../css/Navbar.css";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme + "-theme";
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <NavLink to="/" className="nav-item">
            🏠 Home
          </NavLink>
          <NavLink to="/champions" className="nav-item">
            🏆 Champions
          </NavLink>
          <NavLink to="/circuits" className="nav-item">
            🏟️ Circuits
          </NavLink>
          <NavLink to="/drivers" className="nav-item">
            👨‍✈️ Drivers
          </NavLink>
          <NavLink to="/pole-positions" className="nav-item">
            ⏱️ Pole Positions
          </NavLink>
          <NavLink to="/race-results" className="nav-item">
            📊 Standings
          </NavLink>
          <NavLink to="/schedule" className="nav-item">
            📅 Schedule
          </NavLink>
          <NavLink to="/standings" className="nav-item">
            📈 Current Standings
          </NavLink>
          <NavLink to="/teams" className="nav-item">
            🏎️ Teams
          </NavLink>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
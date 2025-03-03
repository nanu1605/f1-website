import { Link } from "react-router-dom";
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
          <Link to="/" className="nav-item">
            🏠 Home
          </Link>
          {/* <Link to="/cars" className="nav-item">🚗 Cars</Link> */}
          <Link to="/champions" className="nav-item">
            🏆 Champions
          </Link>
          <Link to="/circuits" className="nav-item">
            🏟️ Circuits
          </Link>
          <Link to="/drivers" className="nav-item">
            👨‍✈️ Drivers
          </Link>
          <Link to="/pole-positions" className="nav-item">
            ⏱️ Pole Positions
          </Link>
          <Link to="/race-results" className="nav-item">
            📊 Standings
          </Link>
          {/* <Link to="/races" className="nav-item">🏁 Races</Link> */}
          <Link to="/schedule" className="nav-item">
            📅 Schedule
          </Link>
          <Link to="/standings" className="nav-item">
            📈 Current Standings
          </Link>
          <Link to="/teams" className="nav-item">
            🏎️ Teams
          </Link>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Champions from "./pages/Champions";
import Circuits from "./pages/Circuits";
import Drivers from "./pages/Drivers";
import PolePositions from "./pages/PolePositions";
import RaceResults from "./pages/RaceResults";
import Races from "./pages/Races";
import Schedule from "./pages/Schedule";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";
import "./style.css"; // Ensure styles are imported
import "./theme.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/champions" element={<Champions />} />
            <Route path="/circuits" element={<Circuits />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/pole-positions" element={<PolePositions />} />
            <Route path="/race-results" element={<RaceResults />} />
            <Route path="/races" element={<Races />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

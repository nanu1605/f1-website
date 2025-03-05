import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./../css/Schedule.css"; // Ensure you have this CSS file

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get("https://ergast.com/api/f1/current.json")
      .then((response) => {
        setSchedule(response.data.MRData.RaceTable.Races);
      })
      .catch((error) => console.error("Error fetching schedule:", error));
  }, []);

  // Function to generate Wikipedia link for each circuit
  const getWikipediaLink = (circuitName) => {
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(circuitName)}`;
  };

  return (
    <motion.div 
      className="schedule-page"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="schedule-title">🏁 F1 Race Schedule 🏎️</h1>
      {schedule.length === 0 ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <motion.ul 
          className="schedule-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {schedule.map((race, index) => (
            <motion.li 
              key={race.round}
              className="race-item"
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <span className="race-name">{race.raceName}</span> - 
              <a 
                href={getWikipediaLink(race.Circuit.circuitName)}
                target="_blank" 
                rel="noopener noreferrer"
                className="circuit-name"
              >
                {race.Circuit.circuitName}
              </a>
              <span className="race-date">({race.date})</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Schedule;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./../css/YearButton.css";
const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get("https://ergast.com/api/f1/current.json")
      .then((response) => {
        setSchedule(response.data.MRData.RaceTable.Races);
      })
      .catch((error) => console.error("Error fetching schedule:", error));
  }, []);

  return (
    <motion.div 
      className="page schedule-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1>F1 Race Schedule</h1>
      {schedule.length === 0 ? (
        <p className="data-not-found">Loading...</p>
      ) : (
        <ul>
          {schedule.map((race) => (
            <li key={race.round}>
              {race.raceName} - {race.Circuit.circuitName} ({race.date})
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Schedule;

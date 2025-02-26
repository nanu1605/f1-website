import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Races = () => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    axios.get("https://ergast.com/api/f1/current.json")
      .then((response) => {
        setRaces(response.data.MRData.RaceTable.Races);
      })
      .catch((error) => console.error("Error fetching races:", error));
  }, []);

  return (
    <motion.div 
      className="page races-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1>F1 Races (Current Season)</h1>
      {races.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {races.map((race) => (
            <li key={race.round}>
              {race.raceName} - {race.Circuit.circuitName} ({race.date})
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Races;

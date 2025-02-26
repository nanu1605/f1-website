import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PolePositions = () => {
  const [poleWinners, setPoleWinners] = useState([]);

  useEffect(() => {
    axios.get("https://ergast.com/api/f1/current/qualifying.json")
      .then((response) => {
        const races = response.data.MRData.RaceTable.Races;
        const poles = races.map((race) => ({
          raceName: race.raceName,
          driver: race.QualifyingResults[0].Driver,
        }));
        setPoleWinners(poles);
      })
      .catch((error) => console.error("Error fetching pole positions:", error));
  }, []);

  return (
    <motion.div 
      className="page pole-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1>Pole Positions (Current Season)</h1>
      {poleWinners.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {poleWinners.map((race, index) => (
            <li key={index}>
              {race.raceName}: {race.driver.givenName} {race.driver.familyName}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default PolePositions;

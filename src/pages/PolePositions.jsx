import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./../css/PolePositions.css";

const PolePositions = () => {
  const [poleWinners, setPoleWinners] = useState([]);

  useEffect(() => {
    axios
      .get("https://ergast.com/api/f1/current/qualifying.json")
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
      <motion.h1
        className="pole-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        🏁 Pole Positions (Current Season) 🏎️
      </motion.h1>

      {poleWinners.length === 0 ? (
        <motion.p
          className="loading-text"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.p>
      ) : (
        <motion.div
          className="pole-list-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {poleWinners.map((race, index) => (
            <motion.div
              className="pole-card"
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <p className="race-name">🏎️ {race.raceName}</p>
              <p className="pole-driver">
                🏁 {race.driver.givenName} {race.driver.familyName}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PolePositions;

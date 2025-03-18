import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./../css/Standings.css";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);

  useEffect(() => {
    axios
      .get("https://ergast.com/api/f1/${selectedYear}/driverStandings.json")
      .then((response) => {
        setStandings(
          response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      })
      .catch((error) => console.error("Error fetching standings:", error));
  }, []);

  return (
    <motion.div
      className="standings-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="standings-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        F1 CURRENT STANDINGS
      </motion.h1>

      {standings.length === 0 ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <motion.ul
          className="standings-list"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {standings.map((driver) => (
            <motion.li
              key={driver.Driver.driverId}
              className="standings-item"
              whileHover={{
                scale: 1.05, // Small, subtle scaling
                color: "#ff0000", // Text turns red
                textShadow: "0px 0px 8px rgba(255, 0, 0, 0.8)", // Glowing effect
              }}
              transition={{ type: "tween", duration: 0.15 }} // Fast and smooth
            >
              {driver.position}. {driver.Driver.givenName}{" "}
              {driver.Driver.familyName}- {driver.Constructors[0].name} (
              {driver.points} pts)
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Standings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./../css/YearButton.css";
const Standings = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios.get("https://ergast.com/api/f1/current/driverStandings.json")
      .then((response) => {
        setStandings(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      })
      .catch((error) => console.error("Error fetching standings:", error));
  }, []);

  return (
    <motion.div 
      className="page standings-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1>F1 Current Standings</h1>
      {standings.length === 0 ? (
        <p className="data-not-found">Loading...</p>
      ) : (
        <ul>
          {standings.map((driver) => (
            <li key={driver.Driver.driverId}>
              {driver.position}. {driver.Driver.givenName} {driver.Driver.familyName} - {driver.Constructors[0].name} ({driver.points} pts)
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Standings;

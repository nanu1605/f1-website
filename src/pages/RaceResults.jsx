import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./../css/RaceResults.css"; // Custom styles
import "./../css/YearButton.css";
const RaceResults = () => {
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);

  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const driverResponse = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/driverStandings.json`
        );
        const driverData = await driverResponse.json();
        setDriverStandings(
          driverData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []
        );

        const constructorResponse = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/constructorStandings.json`
        );
        const constructorData = await constructorResponse.json();
        setConstructorStandings(
          constructorData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || []
        );
      } catch (error) {
        console.error("Error fetching race results:", error);
      }
    };

    fetchRaceResults();
  }, [selectedYear]);

  return (
    <motion.div 
      className="race-results-page bg-black text-white p-8 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-center mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Formula 1 Race Results ({selectedYear})
      </motion.h1>

      {/* Year Selection Buttons */}
      <div className="year-buttons">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={year === selectedYear ? "active" : ""}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Driver Standings */}
      <motion.div 
        className="results-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold mb-4">🏎️ Driver Standings</h2>
        {driverStandings.length > 0 ? (
          <motion.table 
            className="w-full border-collapse bg-gray-900 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="p-3">Position</th>
                <th>Driver</th>
                <th>Nationality</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {driverStandings.map((driver) => (
                <motion.tr 
                  key={driver.Driver.driverId}
                  className="hover:bg-gray-700 transition duration-300"
                  // whileHover={{ scale: 1.02 }}
                >
                  <td className="p-3">{driver.position}</td>
                  <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                  <td>{driver.Driver.nationality}</td>
                  <td>{driver.Constructors[0]?.name}</td>
                  <td>{driver.points}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        ) : (
          <p className="data-not-found">No driver standings data available for {selectedYear}.</p>
        )}
      </motion.div>

      {/* Constructor Standings */}
      <motion.div 
        className="results-section mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-4">🏆 Constructor Standings</h2>
        {constructorStandings.length > 0 ? (
          <motion.table 
            className="w-full border-collapse bg-gray-900 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="p-3">Position</th>
                <th>Team</th>
                <th>Nationality</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {constructorStandings.map((team) => (
                <motion.tr 
                  key={team.Constructor.constructorId}
                  className="hover:bg-gray-700 transition duration-300"
                >
                  <td className="p-3">{team.position}</td>
                  <td>{team.Constructor.name}</td>
                  <td>{team.Constructor.nationality}</td>
                  <td>{team.points}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        ) : (
          <p>No constructor standings data available for {selectedYear}.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RaceResults;

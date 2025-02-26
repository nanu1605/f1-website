import React, { useState, useEffect } from "react";

const RaceResults = () => {
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025); // Default year

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        // Fetch driver standings
        const driverResponse = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/driverStandings.json`
        );
        const driverData = await driverResponse.json();
        setDriverStandings(
          driverData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []
        );

        // Fetch constructor standings
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
  }, [selectedYear]); // Refetch when year changes

  return (
    <div className="race-results-page">
      <h1>Formula 1 Race Results ({selectedYear})</h1>

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
      <div className="results-section">
        <h2>🏎️ Driver Standings</h2>
        {driverStandings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Nationality</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {driverStandings.map((driver) => (
                <tr key={driver.Driver.driverId}>
                  <td>{driver.position}</td>
                  <td>
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </td>
                  <td>{driver.Driver.nationality}</td>
                  <td>{driver.Constructors[0]?.name}</td>
                  <td>{driver.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No driver standings data available for {selectedYear}.</p>
        )}
      </div>

      {/* Constructor Standings */}
      <div className="results-section">
        <h2>🏆 Constructor Standings</h2>
        {constructorStandings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Nationality</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {constructorStandings.map((team) => (
                <tr key={team.Constructor.constructorId}>
                  <td>{team.position}</td>
                  <td>{team.Constructor.name}</td>
                  <td>{team.Constructor.nationality}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No constructor standings data available for {selectedYear}.</p>
        )}
      </div>
    </div>
  );
};

export default RaceResults;

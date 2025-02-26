import React, { useState, useEffect } from "react";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025); // Default year

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/constructors.json`
        );
        const data = await response.json();
        setTeams(data.MRData.ConstructorTable.Constructors || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [selectedYear]); // Refetch when year changes

  return (
    <div className="teams-page">
      <h1>Formula 1 Teams ({selectedYear})</h1>

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

      {/* Teams List */}
      <div className="teams-section">
        {teams.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.constructorId}>
                  <td>{team.name}</td>
                  <td>{team.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No team data available for {selectedYear}.</p>
        )}
      </div>
    </div>
  );
};

export default Teams;

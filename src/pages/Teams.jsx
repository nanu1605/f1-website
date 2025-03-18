import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import "./../css/YearButton.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/constructors.json`
        );
        const data = await response.json();
        setTeams(data.MRData.ConstructorTable.Constructors || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [selectedYear]);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  return (
    <div className="teams-page">
      <h1>Formula 1 Teams ({selectedYear})</h1>

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

      {/* Loading State */}
      {isLoading ? (
        <Loading />
      ) : (
        <div ref={contentRef} className="teams-section">
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
            <p className="data-not-found">No team data available for {selectedYear}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Teams;

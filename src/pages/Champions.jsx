import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import "./../css/YearButton.css";
import "./../css/Champions.css";

const Champions = () => {
  const [champion, setChampion] = useState(null);
  const [constructorChampion, setConstructorChampion] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025); // Default year
  const [isLoading, setIsLoading] = useState(false);

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchChampions = async () => {
      setIsLoading(true);
      try {
        // Fetch driver champion data
        const driverResponse = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/driverStandings.json`
        );
        const driverData = await driverResponse.json();
        const championData = driverData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings[0]?.Driver;

        // Fetch constructor champion data
        const constructorResponse = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/constructorStandings.json`
        );
        const constructorData = await constructorResponse.json();
        const constructorChampionData = constructorData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings[0]?.Constructor;

        setChampion(championData);
        setConstructorChampion(constructorChampionData);
      } catch (error) {
        console.error("Error fetching championship data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampions();
  }, [selectedYear]); // Refetch when year changes

  return (
    <div className="champions-page">
      <h1>Formula 1 Champions ({selectedYear})</h1>

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

      {/* Champion Details */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="champion-details">
          {champion ? (
            <div className="champion-card">
              <h2>🏆 Driver Champion: {champion.givenName} {champion.familyName}</h2>
              <p>Nationality: {champion.nationality}</p>
            </div>
          ) : (
          <p className="data-not-found">No driver champion data available for {selectedYear}.</p>
          )}

          {constructorChampion ? (
            <div className="champion-card">
              <h2>🏎️ Constructor Champion: {constructorChampion.name}</h2>
              <p>Nationality: {constructorChampion.nationality}</p>
            </div>
          ) : (
          <p className="data-not-found">No constructor champion data available for {selectedYear}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Champions;

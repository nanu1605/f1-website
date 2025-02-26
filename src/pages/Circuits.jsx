import React, { useState, useEffect } from "react";

const Circuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025); // Default year

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/circuits.json`
        );
        const data = await response.json();
        setCircuits(data.MRData.CircuitTable.Circuits);
      } catch (error) {
        console.error("Error fetching circuits:", error);
      }
    };

    fetchCircuits();
  }, [selectedYear]); // Refetch when year changes

  return (
    <div className="circuits-page">
      <h1>Formula 1 Circuits ({selectedYear})</h1>

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

      {/* Circuits List */}
      <div className="circuits-list">
        {circuits.length > 0 ? (
          circuits.map((circuit) => (
            <div key={circuit.circuitId} className="circuit-card">
              <h2>{circuit.circuitName}</h2>
              <p>Location: {circuit.Location.locality}, {circuit.Location.country}</p>
              <a href={circuit.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          ))
        ) : (
          <p>No circuits found for {selectedYear}.</p>
        )}
      </div>
    </div>
  );
};

export default Circuits;

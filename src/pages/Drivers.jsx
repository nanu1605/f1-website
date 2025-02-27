import React, { useState, useEffect } from "react";
import "./../css/YearButton.css";
const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025); // Default year

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/drivers.json`
        );
        const data = await response.json();
        setDrivers(data.MRData.DriverTable.Drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, [selectedYear]); // Refetch when year changes

  return (
    <div className="drivers-page">
      <h1>Formula 1 Drivers ({selectedYear})</h1>

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

      {/* Drivers List */}
      <div className="drivers-list">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <div key={driver.driverId} className="driver-card">
              <h2>{driver.givenName} {driver.familyName}</h2>
              <p>Nationality: {driver.nationality}</p>
              <p>Code: {driver.code || "N/A"}</p>
            </div>
          ))
        ) : (
          <p className="data-not-found">No drivers found for {selectedYear}.</p>
        )}
      </div>
    </div>
  );
};

export default Drivers;

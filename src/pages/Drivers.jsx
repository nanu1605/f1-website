import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import "./../css/YearButton.css";
import "./../css/Drivers.css";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025); // Default year
  const [isLoading, setIsLoading] = useState(false);

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/drivers.json`
        );
        const data = await response.json();
        const driversData = data.MRData.DriverTable.Drivers || [];

        // Fetch Wikipedia URLs and images for each driver
        const driversWithDetails = await Promise.all(
          driversData.map(async (driver) => {
            const imageUrl = await fetchDriverImage(driver.url);
            return { ...driver, imageUrl };
          })
        );

        setDrivers(driversWithDetails);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, [selectedYear]); // Refetch when year changes

  // Function to fetch driver image from Wikipedia
  const fetchDriverImage = async (wikipediaUrl) => {
    if (!wikipediaUrl) return null;

    try {
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaUrl.split("/").pop()}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.thumbnail?.source || null;
    } catch (error) {
      console.error("Error fetching driver image:", error);
      return null;
    }
  };

  // Function to open Wikipedia page in new tab
  const openWikiPage = (wikiUrl) => {
    if (wikiUrl) {
      window.open(wikiUrl, "_blank");
    }
  };

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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="drivers-list">
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <div
                key={driver.driverId}
                className="driver-card"
                onClick={() => openWikiPage(driver.url)}
              >
                <h2>{driver.givenName} {driver.familyName}</h2>
                <p>Nationality: {driver.nationality}</p>
                <p>Code: {driver.code || "N/A"}</p>
                {driver.imageUrl ? (
                  <img
                    src={driver.imageUrl}
                    alt={`${driver.givenName} ${driver.familyName}`}
                    width="120"
                    className="driver-image"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            ))
          ) : (
            <p className="data-not-found">No drivers found for {selectedYear}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Drivers;

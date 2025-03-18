import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import "./../css/YearButton.css";
import "./../css/Circuits.css";

const Circuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024); // Default year
  const [isLoading, setIsLoading] = useState(false);

  // Generate a list of years from 1950 to 2025
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchCircuits = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedYear}/circuits.json`
        );
        const data = await response.json();
        const circuitsData = data.MRData.CircuitTable.Circuits || [];

        // Fetch images for each circuit from Wikipedia
        const circuitsWithImages = await Promise.all(
          circuitsData.map(async (circuit) => {
            const imageUrl = await fetchCircuitImage(circuit.url);
            return { ...circuit, imageUrl };
          })
        );

        setCircuits(circuitsWithImages);
      } catch (error) {
        console.error("Error fetching circuits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCircuits();
  }, [selectedYear]); // Refetch when year changes

  // Function to fetch circuit image from Wikipedia
  const fetchCircuitImage = async (wikipediaUrl) => {
    if (!wikipediaUrl) return null;

    try {
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaUrl.split("/").pop()}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.thumbnail?.source || null;
    } catch (error) {
      console.error("Error fetching circuit image:", error);
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="circuits-list">
          {circuits.length > 0 ? (
            circuits.map((circuit) => (
              <div 
                key={circuit.circuitId} 
                className="circuit-card"
                onClick={() => openWikiPage(circuit.url)}
              >
                <h2>{circuit.circuitName}</h2>
                <p>Location: {circuit.Location.locality}, {circuit.Location.country}</p>
                {circuit.imageUrl ? (
                  <img
                    src={circuit.imageUrl}
                    alt={`${circuit.circuitName} track`}
                    className="circuit-image"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            ))
          ) : (
            <p className="data-not-found">No circuits found for {selectedYear}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Circuits;

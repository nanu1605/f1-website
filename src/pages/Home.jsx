import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./../css/Home.css";

const Home = () => {
  const [latestChampion, setLatestChampion] = useState(null);

  useEffect(() => {
    const fetchLatestChampion = async () => {
      try {
        const response = await fetch(
          "https://ergast.com/api/f1/current/driverStandings.json"
        );
        const data = await response.json();
        const championData =
          data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings[0]
            ?.Driver;
        setLatestChampion(championData);
      } catch (error) {
        console.error("Error fetching latest champion:", error);
      }
    };

    fetchLatestChampion();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>🏎️ Welcome to the F1 Universe 🔥</h1>
        <div className="text-container">
          <p className="animated-text">
            Experience the speed, thrill, and history of Formula 1.
          </p>
        </div>
        <Link to="/races" className="cta-button">
          Explore Races
        </Link>
      </motion.div>

      {/* History of F1 */}
      <motion.div
        className="history-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>📜 History of Formula 1</h2>
        <p className="history-text">
          <strong>Formula 1</strong> began its journey in{" "}
          <span className="highlight">1950</span>, establishing itself as the
          <b> pinnacle of motorsport</b>. From roaring V12 engines to today’s
          high-tech<b> hybrid power units</b>, F1 has continuously evolved,
          blending speed, technology, and strategy into an electrifying
          spectacle.
        </p>
        <p className="history-text">
          <b>The Golden Era</b> of F1 saw legendary rivalries—<b>Senna vs Prost</b>,
          <b>Schumacher’s dominance</b>, and <b>Hamilton’s rise</b>. Tracks like
          <b>Monaco, Silverstone, and Monza</b> have witnessed some of the most
          unforgettable moments in motorsport history.
        </p>
        <p className="history-text">
          The sport continues to push the limits of <b>aerodynamics, tire
          technology, and driver skill</b>, making it the ultimate battleground
          for racing excellence. <b>Cutting-edge engineering</b>, combined with the
          human element of fearless drivers, has made F1 the fastest and most
          technologically advanced motorsport in history.
        </p>
      </motion.div>

      {/* Current World Champion */}
      <motion.div
        className="featured-champion"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>🏆 Current World Champion</h2>
        {latestChampion ? (
          <div className="champions-card">
            <h3 className="champions-name">
              {latestChampion.givenName} {latestChampion.familyName}
            </h3>
            <p className="champions-details">
              Nationality: {latestChampion.nationality}
            </p>
            <Link to="/champions" className="view-all-link">
              View All Champions
            </Link>
          </div>
        ) : (
          <p>Loading Champion Data...</p>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="footer">
        <h4>
          Powered by <strong>Formula 1 Insight</strong> | Built with ❤️ for
          Racing Fans
        </h4>
        <h4>
          Explore More:{" "}
          <a
            href="https://www.formula1.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official F1 Website
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;

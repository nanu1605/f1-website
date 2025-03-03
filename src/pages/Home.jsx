import React from "react";
import { motion } from "framer-motion";
import "./../css/YearButton.css";
import "./../css/Home.css";
const Home = () => {
  return (
    <motion.div
      className="page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section class="home-content">
        <h1>🏎️ WELCOME TO THE F1 UNIVERSE 🔥</h1>
        <p>
          Explore the speed, passion, and legacy of <strong>Formula 1</strong>{" "}
          like never before!
        </p>

        <ul>
          <li>
            🏁 Dive into the <strong>history of champions</strong>, legendary
            circuits, and iconic teams.
          </li>
          <li>
            🏆 Track the <strong>greatest drivers</strong> and their battles for
            glory.
          </li>
          <li>
            ⚙️ Discover the <strong>cutting-edge technology</strong> powering
            these high-speed machines.
          </li>
          <li>
            📅 Stay updated with{" "}
            <strong>race results, schedules, and standings</strong> all in one
            place.
          </li>
        </ul>

        <p class="cta">
          Are you ready to relive the most electrifying moments in motorsport?
          🚀 <strong>Buckle up and start your journey!</strong>
        </p>
      </section>
    </motion.div>
  );
};

export default Home;

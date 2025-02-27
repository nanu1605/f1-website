import React from "react";
import { motion } from "framer-motion";
import "./../css/YearButton.css";
const Home = () => {
  return (
    <motion.div 
      className="page home-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1>Welcome to the F1 Universe</h1>
      <p>Explore the history, teams, and drivers of Formula 1.</p>
    </motion.div>
  );
};

export default Home;

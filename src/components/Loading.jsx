import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.p
      className="loading-text"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      Loading...
    </motion.p>
  );
};

export default Loading;
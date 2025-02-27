import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./../css/YearButton.css";
const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("https://ergast.com/api/f1/2023/constructors.json")
      .then((response) => {
        setCars(response.data.MRData.ConstructorTable.Constructors);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  return (
    <motion.div 
      className="page cars-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1>F1 Cars (2023 Teams)</h1>
      {cars.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cars.map((car) => (
            <li key={car.constructorId}>
              {car.name} - {car.nationality}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Cars;

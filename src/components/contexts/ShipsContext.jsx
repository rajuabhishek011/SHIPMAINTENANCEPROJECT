import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to manage ship-related data
const ShipsContext = createContext();

// Custom hook to access the ShipsContext from components
export const useShips = () => {
  return useContext(ShipsContext);
};

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  // Load ships from localStorage when the component mounts
  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem('ships')) || [];
    setShips(storedShips);
  }, []);

  // Function to add a new ship
  const addShip = (newShip) => {
    const updatedShips = [...ships, newShip];
    setShips(updatedShips);
    localStorage.setItem('ships', JSON.stringify(updatedShips)); // Persist to localStorage
  };

  // Function to update/edit an existing ship
  const editShip = (editedShip) => {
    const updatedShips = ships.map((ship) =>
      ship.id === editedShip.id ? editedShip : ship
    );
    setShips(updatedShips);
    localStorage.setItem('ships', JSON.stringify(updatedShips)); // Persist changes
  };

  // Function to delete a ship by ID
  const deleteShip = (id) => {
    const updatedShips = ships.filter((ship) => ship.id !== id);
    setShips(updatedShips);
    localStorage.setItem('ships', JSON.stringify(updatedShips)); // Persist changes
  };

  // Provide ship data and ship management functions to children components
  return (
    <ShipsContext.Provider value={{ ships, addShip, editShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

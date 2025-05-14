import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context for ship components
const ComponentsContext = createContext();

// Custom hook to access ComponentsContext
export const useComponents = () => {
  return useContext(ComponentsContext);
};

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  // Load components from localStorage when the provider mounts
  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem('components')) || [];
    setComponents(storedComponents);
  }, []);

  // Function to add a new component to the list
  const addComponent = (newComponent) => {
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents)); // Persist to localStorage
  };

  // Function to update an existing component by ID
  const updateComponent = (updatedComponent) => {
    const updatedComponents = components.map((component) =>
      component.id === updatedComponent.id ? updatedComponent : component
    );
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents));
  };

  // Function to delete a component by ID
  const deleteComponent = (id) => {
    const updatedComponents = components.filter((component) => component.id !== id);
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents));
  };

  // Provide the component list and management functions to the app
  return (
    <ComponentsContext.Provider value={{ components, addComponent, updateComponent, deleteComponent }}>
      {children}
    </ComponentsContext.Provider>
  );
};

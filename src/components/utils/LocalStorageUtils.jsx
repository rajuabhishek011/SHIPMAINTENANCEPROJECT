// Save data to localStorage by a specific key
export const saveToLocalStorage = (key, data) => {
  // Convert the data to JSON format and store it in localStorage under the given key
  localStorage.setItem(key, JSON.stringify(data));
};

// Retrieve data from localStorage by key. Returns an empty array if nothing is found
export const getFromLocalStorage = (key) => {
  // Parse the stored JSON data or return an empty array if nothing is found
  return JSON.parse(localStorage.getItem(key)) || [];
};

// Retrieve a specific component by its ID
export const getComponentById = (id) => {
  // If no ID is provided, return null
  if (!id) return null;

  // Get the components from localStorage
  const components = getFromLocalStorage('components');
  
  // Find and return the component that matches the given ID, or return null if not found
  return components.find((component) => component.id.toString() === id.toString()) || null;
};

// Add a new component to the localStorage
export const addComponent = (shipId, newComponent) => {
  // Get existing components from localStorage
  const components = getFromLocalStorage('components');
  
  // Create a new component with a unique ID and associated shipId
  const componentWithId = {
    ...newComponent,
    id: Date.now().toString(), // Use current timestamp as a unique ID
    shipId: shipId.toString(), // Ensure shipId is stored as a string
  };
  
  // Add the new component to the list of components
  const updatedComponents = [...components, componentWithId];
  
  // Save the updated components list to localStorage
  saveToLocalStorage('components', updatedComponents);
};

// Update an existing component by its ID
export const updateComponent = (componentId, updatedComponent) => {
  // Get the list of components from localStorage
  const components = getFromLocalStorage('components');
  
  // Update the component that matches the provided componentId
  const updatedList = components.map((component) =>
    component.id.toString() === componentId.toString()
      ? { ...component, ...updatedComponent } // Merge the updated fields
      : component // Leave other components unchanged
  );
  
  // Save the updated list back to localStorage
  saveToLocalStorage('components', updatedList);
};

// Delete a component by its ID
export const deleteComponent = (componentId) => {
  // Get the list of components from localStorage
  const components = getFromLocalStorage('components');
  
  // Filter out the component that matches the provided componentId
  const filtered = components.filter(
    (component) => component.id.toString() !== componentId.toString()
  );
  
  // Save the filtered list back to localStorage
  saveToLocalStorage('components', filtered);
};

// Retrieve all components associated with a specific shipId
export const getComponentsByShipId = (shipId) => {
  // Get the list of components from localStorage
  const components = getFromLocalStorage('components');
  
  // Filter the components that match the given shipId
  return components.filter((component) => component.shipId.toString() === shipId.toString());
};

// Retrieve a specific ship by its ID
export const getShipById = (id) => {
  // Get the list of ships from localStorage
  const ships = getFromLocalStorage('ships');
  
  // Find and return the ship that matches the given ID, or return null if not found
  return ships.find((ship) => ship.id.toString() === id.toString()) || null;
};

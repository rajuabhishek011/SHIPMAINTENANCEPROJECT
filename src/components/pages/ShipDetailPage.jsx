// Import necessary React hooks and components
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShipById, getComponentsByShipId, deleteComponent } from '../utils/LocalStorageUtils';
import ComponentList from '../Components/ComponentList';

const ShipDetailPage = () => {
  // Retrieve ship ID from the URL parameters
  const { id } = useParams();
  const [ship, setShip] = useState(null); // State to store the ship data
  const [components, setComponents] = useState([]); // State to store the components of the ship
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track error messages
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch ship data and components when the component is mounted or ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ship details by ID
        const fetchedShip = await getShipById(id);
        setShip(fetchedShip);

        // Fetch components by ship ID
        const fetchedComponents = await getComponentsByShipId(id);
        setComponents(fetchedComponents);
      } catch (err) {
        setError('Failed to fetch ship data. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData(); // Call fetch function when component mounts or ID changes
  }, [id]);

  // Function to handle component deletion
  const handleDeleteComponent = async (componentId) => {
    try {
      // Delete the component by its ID
      await deleteComponent(componentId);
      // Update the components list after deletion
      setComponents((prev) => prev.filter((component) => component.id !== componentId));
    } catch (err) {
      setError('Failed to delete component. Please try again later.');
    }
  };

  // Function to handle editing a component
  const handleEditComponent = (component) => {
    navigate(`/components/edit/${id}/${component.id}`); // Navigate to the component edit page
  };

  // If the data is still loading, show loading message
  if (loading) {
    return <p>Loading...</p>; 
  }

  // If there was an error fetching the data, show error message
  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {ship && (
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#2c3e50' }}>
            {ship.name} - Ship Profile
          </h2>

          {/* Display ship information */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '6px 0', color: '#34495e', fontSize: '1.1rem' }}>
              <strong>IMO:</strong> {ship.imo}
            </p>
            <p style={{ margin: '6px 0', color: '#34495e', fontSize: '1.1rem' }}>
              <strong>Flag:</strong> {ship.flag}
            </p>
            <p style={{ margin: '6px 0', color: '#34495e', fontSize: '1.1rem' }}>
              <strong>Status:</strong> {ship.status}
            </p>
          </div>

          {/* Display maintenance history */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Maintenance History</h3>
            {ship.maintenanceHistory?.length > 0 ? (
              <ul>
                {ship.maintenanceHistory.map((history, index) => (
                  <li key={index}>{history}</li>
                ))}
              </ul>
            ) : (
              <p>No maintenance history available.</p>
            )}
          </div>

          {/* Display installed components and a button to add new components */}
          <div>
            <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Installed Components</h3>
            <ComponentList
              components={components}
              onEdit={handleEditComponent}
              onDelete={handleDeleteComponent}
            />
            <button
              onClick={() => navigate(`/components/add/${id}`)}
              style={{
                marginTop: '20px',
                padding: '10px 16px',
                backgroundColor: '#2e86de',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#1f6cb5')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#2e86de')}
            >
              Add New Component
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipDetailPage;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation between pages

const ShipList = ({ ships, isLoading }) => {
  // Show loading message when data is still being fetched
  if (isLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '50px',
          backgroundColor: '#f4f6f8',
          fontSize: '1.5rem', // Style for loading message
        }}
      >
        Loading ships...
      </div>
    );
  }

  // Show message when no ships are available
  if (ships.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '50px',
          backgroundColor: '#f4f6f8',
          fontSize: '1.5rem', // Style for no ships available message
        }}
      >
        No ships available.
      </div>
    );
  }

  // If there are ships, display them in a list
  return (
    <div className="ship-list" style={{ padding: '20px', background: '#f4f6f8' }}>
      {ships.map((ship) => (
        <div
          key={ship.id} // Ensure each ship item has a unique key
          className="ship-item"
          style={{
            backgroundColor: '#fff', // White background for each ship item
            padding: '15px',
            margin: '10px 0',
            borderRadius: '8px', // Rounded corners for ship item
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow effect for depth
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s', // Smooth hover effect for transform and shadow
          }}
        >
          <h3 style={{ color: '#1976d2' }}>{ship.name}</h3> {/* Ship name with blue color */}
          <p style={{ fontSize: '14px', color: '#555' }}>{ship.imo}</p> {/* IMO number displayed in gray */}
          
          {/* Link to ship details page */}
          <Link
            to={`/ships/${ship.id}`} // Dynamically navigate to the details page of the clicked ship
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 15px',
              backgroundColor: '#1976d2', // Blue background for the button
              color: '#fff',
              borderRadius: '4px', // Rounded button corners
              textDecoration: 'none', // Remove underline from link
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s', // Button hover effects
            }}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShipList; // Export the ShipList component for use in other parts of the application

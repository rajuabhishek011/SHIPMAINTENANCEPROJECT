// Importing React library
import React from 'react';

const ShipDetail = ({ ship }) => {
  // Function to determine the background color based on ship's status
  const getBackgroundColor = () => {
    if (ship.status === 'Active') return 'linear-gradient(to right, #4caf50, #81c784)'; // Green for active ships
    if (ship.status === 'Inactive') return 'linear-gradient(to right, #e74c3c, #ec7063)'; // Red for inactive ships
    return 'linear-gradient(to right, #f0f4f8, #ffffff)'; // Default light gradient for other statuses
  };

  return (
    <div
      className="ship-detail"
      style={{
        padding: '20px',
        background: getBackgroundColor(), // Apply the dynamic background color based on the ship's status
        borderRadius: '10px', // Rounded corners for the detail container
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Slight shadow for better appearance
        maxWidth: '800px', // Limit the max width of the ship detail container
        margin: '20px auto', // Center the container with some spacing
        fontFamily: 'Arial, sans-serif', // Apply font style
      }}
    >
      {/* Ship name which is clickable */}
      <h2
        style={{
          fontSize: '2rem',
          color: '#2c3e50',
          marginBottom: '15px',
          cursor: 'pointer', // Pointer cursor to indicate it's clickable
        }}
        onClick={() => alert('Navigating to ship details page')} // Alert on click (you can replace with actual navigation)
        onMouseEnter={(e) => (e.target.style.color = '#1abc9c')} // Change color on hover
        onMouseLeave={(e) => (e.target.style.color = '#2c3e50')} // Reset color when mouse leaves
      >
        {ship.name} {/* Display the ship's name */}
      </h2>

      {/* Display ship's IMO (International Maritime Organization) number */}
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '10px',
          color: '#34495e', // Text color for each detail
        }}
      >
        <strong>IMO: </strong>{ship.imo} {/* Ship's IMO number */}
      </p>

      {/* Display ship's flag */}
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '10px',
          color: '#34495e',
        }}
      >
        <strong>Flag: </strong>{ship.flag} {/* Ship's flag */}
      </p>

      {/* Display ship's status */}
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '10px',
          color: '#34495e',
        }}
      >
        <strong>Status: </strong>{ship.status} {/* Ship's current status */}
      </p>

      {}
    </div>
  );
};

export default ShipDetail; // Export the component for use in other parts of the application

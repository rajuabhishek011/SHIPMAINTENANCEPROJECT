// Import necessary React hooks and utilities
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ShipForm = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL for editing an existing ship
  const navigate = useNavigate(); // For navigation after form submission

  // State variables for the ship's data
  const [name, setName] = useState('');
  const [imo, setImo] = useState('');
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Effect to pre-populate the form if 'id' exists (edit mode)
  useEffect(() => {
    if (id) {
      const shipsData = JSON.parse(localStorage.getItem('ships')) || [];
      const foundShip = shipsData.find((ship) => ship.id === id); // Find ship by ID in localStorage
      if (foundShip) {
        setName(foundShip.name); // Pre-populate ship name
        setImo(foundShip.imo); // Pre-populate IMO number
        setFlag(foundShip.flag); // Pre-populate ship's flag
        setStatus(foundShip.status); // Pre-populate ship's status
      }
    }
  }, [id]); // Effect dependency: runs when 'id' changes (i.e., when editing an existing ship)

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true when submitting form

    const shipsData = JSON.parse(localStorage.getItem('ships')) || [];

    // Create a new ship object or update the existing one
    const newShip = {
      id: id || Date.now().toString(), // If editing, use the existing 'id', else generate a new one
      name,
      imo,
      flag,
      status,
    };

    try {
      // Handle saving the ship (either updating or adding)
      if (id) {
        // Edit mode: update the existing ship
        const updatedShips = shipsData.map((ship) =>
          ship.id === id ? newShip : ship
        );
        localStorage.setItem('ships', JSON.stringify(updatedShips));
        toast.success('Ship updated successfully!', { // Show success toast on update
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } else {
        // Add new ship mode: append the new ship
        shipsData.push(newShip);
        localStorage.setItem('ships', JSON.stringify(shipsData));
        toast.success('Ship added successfully!', { // Show success toast on add
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    } catch (error) {
      // Handle errors (e.g., if localStorage is unavailable)
      toast.error('Error saving ship data. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } finally {
      setLoading(false); // Set loading to false after the request completes
      setTimeout(() => {
        navigate('/ships'); // Navigate back to ships list after a short delay
      }, 1000);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(to right, #eceff1, #ffffff)', // Gradient background
        height: '100vh', // Full screen height
      }}
    >
      <div
        style={{
          maxWidth: '800px', // Max width of the form
          margin: '0 auto', // Center the form
          background: '#ffffff', // White background for the form
          padding: '20px',
          borderRadius: '10px', // Rounded corners for the form container
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow around the form
        }}
      >
        <h2
          style={{
            color: '#34495e', // Title color
            fontSize: '2rem', // Title size
            marginBottom: '15px',
            textAlign: 'center', // Center the title
          }}
        >
          {id ? 'Edit Ship' : 'Add Ship'} {/* Display title based on whether we're editing or adding */}
        </h2>

        <form onSubmit={handleSubmit}> {/* Handle form submission */}
          <div style={{ marginBottom: '20px' }}>
            {/* Form fields for name, IMO, flag, and status */}
            <input
              type="text"
              placeholder="Ship Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state on input change
              required
              style={inputStyle} // Apply custom styling to input
            />
            <input
              type="text"
              placeholder="IMO Number"
              value={imo}
              onChange={(e) => setImo(e.target.value)} // Update IMO state on input change
              required
              style={inputStyle} 
            />
            <input
              type="text"
              placeholder="Flag"
              value={flag}
              onChange={(e) => setFlag(e.target.value)} // Update flag state on input change
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Update status state on input change
              required
              style={inputStyle}
            />
          </div>

          {/* Submit button (disabled when loading) */}
          <button
            type="submit"
            disabled={loading} // Disable the button while the form is being processed
            style={{
              padding: '10px 20px',
              backgroundColor: '#1abc9c', // Green button
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer', // Disable pointer if loading
              fontSize: '1rem',
            }}
          >
            {loading ? 'Saving...' : id ? 'Update Ship' : 'Add Ship'} {/* Button text changes based on loading and action */}
          </button>
        </form>
      </div>

      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
    </div>
  );
};

// Styling for form inputs
const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px', // Space between inputs
};

export default ShipForm; // Export the component for use in other parts of the application

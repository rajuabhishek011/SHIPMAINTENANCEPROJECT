// Import necessary React hooks and components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ShipsPage = () => {
  const [ships, setShips] = useState([]); // State to store the ships list
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch ships data from localStorage when component mounts
  useEffect(() => {
    const shipsData = JSON.parse(localStorage.getItem('ships')) || [];
    setShips(shipsData); // Set ships data to state
    setLoading(false); // Set loading to false once data is fetched
  }, []);

  // Function to handle ship deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ship?');
    if (confirmDelete) {
      const updatedShips = ships.filter(ship => ship.id !== id); // Remove the deleted ship from the list
      setShips(updatedShips); // Update ships list state
      localStorage.setItem('ships', JSON.stringify(updatedShips)); // Save updated list to localStorage
      toast.success('Ship deleted successfully!', { // Show success notification
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored', 
      });
    }
  };

  // If the data is still loading, show loading message
  if (loading) {
    return <p>Loading ships...</p>; 
  }

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(to right, #eceff1, #ffffff)',
        height: '100vh', // Full page height
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Card-like container
        }}
      >
        <h2
          style={{
            color: '#34495e',
            fontSize: '2rem',
            marginBottom: '15px',
            textAlign: 'center', // Center align the heading
          }}
        >
          Ships
        </h2>
        <ul
          style={{
            listStyleType: 'none',
            padding: '0',
            margin: '0',
          }}
        >
          {/* Iterate through each ship and display in list */}
          {ships.map((ship) => (
            <li
              key={ship.id}
              style={{
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                background: '#f7f7f7',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Style for each ship item
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Link to ship details page */}
              <Link
                to={`/ships/${ship.id}`}
                style={{
                  textDecoration: 'none',
                  color: '#1abc9c',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  flexGrow: 1, // Take up all available space
                }}
              >
                {ship.name}
              </Link>
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* Edit button to navigate to the edit page */}
                <button
                  onClick={() => navigate(`/ships/edit/${ship.id}`)}
                  style={{
                    padding: '5px 10px',
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s', // Smooth background change on hover
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
                >
                  Edit
                </button>
                {/* Delete button to remove the ship */}
                <button
                  onClick={() => handleDelete(ship.id)}
                  style={{
                    padding: '5px 10px',
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s', // Smooth background change on hover
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {/* Button to add new ship */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/add-ship')}
            style={{
              padding: '10px 20px',
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s', // Smooth background change on hover
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#27ae60')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#2ecc71')}
          >
            + Add New Ship
          </button>
        </div>
      </div>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ShipsPage;

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComponentList = ({ components, onEdit, onDelete }) => {

  // Handle delete button click, trigger onDelete from props and show success toast
  const handleDelete = (id) => {
    onDelete(id);  // Call onDelete function passed as prop to delete the component
    toast.success('Component deleted successfully!', {
      position: 'top-right',
      autoClose: 3000,  // Toast will automatically close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,  // Allow closing the toast by clicking
      pauseOnHover: true,  // Pause the auto close when hovered
      draggable: true,
      theme: 'colored',  // Colored toast theme
    });
  };

  return (
    <div>
      <ToastContainer />  {/* ToastContainer is required to show the toast notifications */}
      <div
        className="component-list"
        style={{
          display: 'flex',  // Use flexbox for layout
          flexWrap: 'wrap',  // Allow items to wrap into multiple rows if necessary
          justifyContent: 'center',  // Center align the items
          gap: '20px',  // Add space between items
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Loop through the components array and render each component */}
        {components.map((component) => (
          <div
            key={component.id}
            className="component-item"
            style={{
              background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',  // Gradient background for the item
              padding: '16px',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',  // Slight shadow for better appearance
              width: '100%',
              maxWidth: '300px',  // Restrict max width for better responsiveness
              textAlign: 'left',  // Align text to the left
              transition: 'transform 0.2s ease-in-out',  // Smooth hover effect
            }}
          >
            <h3 style={{ color: '#006064', marginBottom: '10px' }}>{component.name}</h3>
            <p style={{ margin: '6px 0' }}><strong>Serial Number:</strong> {component.serialNumber}</p>
            <p style={{ margin: '6px 0' }}><strong>Installation Date:</strong> {component.installDate}</p>
            <p style={{ margin: '6px 0' }}><strong>Last Maintenance:</strong> {component.lastMaintenanceDate}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              {/* Edit button */}
              <button
                onClick={() => onEdit(component)}  // Trigger the onEdit function with the component as argument
                style={{
                  backgroundColor: '#64b5f6',  // Light blue background for the button
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  flex: 1,  // Allow button to fill available space
                }}
              >
                Edit
              </button>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(component.id)}  // Call handleDelete function when clicked
                style={{
                  backgroundColor: '#e57373',  // Red background for the button
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  flex: 1,  // Allow button to fill available space
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentList;

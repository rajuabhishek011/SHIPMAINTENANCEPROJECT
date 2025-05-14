import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComponentById, addComponent, updateComponent } from '../utils/LocalStorageUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComponentForm = () => {
  const { id, componentId } = useParams();  // Get the ship ID and component ID from the URL params
  const navigate = useNavigate();

  // State to store component data
  const [component, setComponent] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: ''
  });

  // State to track loading state when editing a component
  const [loading, setLoading] = useState(!!componentId);

  // Fetch existing component data if editing (using componentId)
  useEffect(() => {
    if (componentId) {
      const fetchData = async () => {
        const fetchedComponent = await getComponentById(componentId);
        if (fetchedComponent) {
          setComponent(fetchedComponent);  // Populate the form with fetched data
        } else {
          toast.error('Component not found!');  // Show error if component is not found
          navigate(`/ships/${id}`);  // Navigate back to the ship view page
        }
        setLoading(false);  // Set loading state to false once data is fetched
      };
      fetchData();
    }
  }, [componentId, id, navigate]);

  // Handle form submission to add or update component
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent page refresh on form submit

    try {
      if (componentId) {
        // If editing, update the component
        await updateComponent(componentId, component);
        toast.success('Component updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } else {
        // If adding, add the new component
        await addComponent(id, component);
        toast.success('Component added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }

      // Navigate back to the ship's components page after a short delay for toast to display
      setTimeout(() => navigate(`/ships/${id}`), 1500);
    } catch (error) {
      // Handle errors by showing an error toast
      toast.error('An error occurred while saving the component.');
    }
  };

  // Display a loading message if still fetching data for an existing component
  if (loading) return <p style={{ padding: '20px', textAlign: 'center' }}>Loading component...</p>;

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '24px',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <ToastContainer />  {/* Toast container for showing success/error messages */}
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#334155',
        }}
      >
        {componentId ? 'Edit Component' : 'Add Component'}  {/* Dynamic title based on context */}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name input field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#475569' }}>Name</label>
          <input
            type="text"
            value={component.name}
            onChange={(e) => setComponent({ ...component, name: e.target.value })}  // Update name state
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
            }}
            required
          />
        </div>
        
        {/* Serial Number input field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#475569' }}>Serial Number</label>
          <input
            type="text"
            value={component.serialNumber}
            onChange={(e) => setComponent({ ...component, serialNumber: e.target.value })}  // Update serial number state
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
            }}
            required
          />
        </div>
        
        {/* Installation Date input field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#475569' }}>Installation Date</label>
          <input
            type="date"
            value={component.installDate}
            onChange={(e) => setComponent({ ...component, installDate: e.target.value })}  // Update install date state
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
            }}
            required
          />
        </div>
        
        {/* Last Maintenance Date input field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#475569' }}>Last Maintenance Date</label>
          <input
            type="date"
            value={component.lastMaintenanceDate}
            onChange={(e) => setComponent({ ...component, lastMaintenanceDate: e.target.value })}  // Update last maintenance date state
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
            }}
            required
          />
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            width: '100%',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
        >
          {componentId ? 'Update Component' : 'Add Component'}  {/* Dynamic button text based on context */}
        </button>
      </form>
    </div>
  );
};

export default ComponentForm;

import React, { useState } from 'react';
import { saveToLocalStorage } from '../utils/LocalStorageUtils'; // Utility function to save data to localStorage
import { toast, ToastContainer } from 'react-toastify'; // For showing toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing the toast styles

const JobForm = ({ onSubmit }) => {
  // State variables to store form data
  const [type, setType] = useState(''); // Job type
  const [priority, setPriority] = useState(''); // Job priority
  const [status, setStatus] = useState('Open'); // Job status
  const [assignedEngineerId, setAssignedEngineerId] = useState(''); // Engineer assigned to the job
  const [shipId, setShipId] = useState(''); // Ship ID the job is associated with
  const [componentId, setComponentId] = useState(''); // Component ID the job is related to
  const [scheduledDate, setScheduledDate] = useState(''); // Date when the job is scheduled

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior (page reload)
    
    // Create a new job object from the form inputs
    const newJob = {
      id: Date.now().toString(), // Unique ID based on the current timestamp
      type,
      priority,
      status,
      assignedEngineerId,
      shipId,
      componentId,
      scheduledDate,
    };

    // Retrieve existing jobs from localStorage, or initialize an empty array if none exist
    const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    // Add the new job to the existing jobs list
    const updatedJobs = [...existingJobs, newJob];
    
    // Save the updated list of jobs to localStorage
    saveToLocalStorage('jobs', updatedJobs);

    // Call the onSubmit callback passed in as a prop, passing the new job
    onSubmit && onSubmit(newJob);

    // Show a success toast notification
    toast.success('Job added successfully!', {
      position: 'top-right', // Position of the toast
      autoClose: 3000, // Duration before the toast disappears
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Close toast on click
      pauseOnHover: true, // Pause on hover
      draggable: true, // Enable dragging the toast
      theme: 'colored', // Toast theme
    });
  };

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '10px', backgroundColor: '#f4f4f9', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New Job</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Job Type Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Type: </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)} // Update type on input change
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Job Priority Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Priority: </label>
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)} // Update priority on input change
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Job Status Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Status: </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Update status on input change
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Assigned Engineer ID Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Assigned Engineer ID: </label>
          <input
            type="text"
            value={assignedEngineerId}
            onChange={(e) => setAssignedEngineerId(e.target.value)} // Update engineer ID on input change
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Ship ID Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Ship ID: </label>
          <input
            type="text"
            value={shipId}
            onChange={(e) => setShipId(e.target.value)} // Update ship ID on input change
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Component ID Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Component ID: </label>
          <input
            type="text"
            value={componentId}
            onChange={(e) => setComponentId(e.target.value)} // Update component ID on input change
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Scheduled Date Input */}
          <label style={{ fontSize: '1rem', color: '#333' }}>Scheduled Date: </label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)} // Update scheduled date on input change
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '20px',
            }}
          >
            Create Job
          </button>
        </form>
      </div>

      {/* ToastContainer for toast notifications */}
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
    </>
  );
};

export default JobForm;

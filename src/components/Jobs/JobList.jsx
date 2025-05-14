import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <div
      className="job-list"
      style={{
        display: 'flex', // Flexbox layout to display the job items in a column
        flexDirection: 'column',
        gap: '20px', // Space between job items
        padding: '20px',
        background: '#fafafa', // Light background color
        borderRadius: '10px', // Rounded corners for the list container
        maxWidth: '800px', // Limit the maximum width
        margin: '0 auto', // Center the list horizontally
      }}
    >
      {jobs.map((job) => (
        <div
          key={job.id} // Unique key for each job item
          className="job-item"
          style={{
            background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', // Gradient background for each job item
            padding: '20px',
            borderRadius: '12px', // Rounded corners for job items
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Soft shadow for the job items
            textAlign: 'left', // Align text to the left
            display: 'flex',
            flexDirection: 'column', // Display content in a column format
            gap: '10px', // Space between job details
            transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition for hover effects
          }}
        >
          {/* Job Type */}
          <h3 style={{ color: '#00796b', marginBottom: '8px', fontSize: '1.2rem' }}>{job.type}</h3>
          {/* Priority */}
          <p><strong>Priority:</strong> {job.priority}</p>
          {/* Status */}
          <p><strong>Status:</strong> {job.status}</p>
          {/* Assigned Engineer */}
          <p><strong>Assigned Engineer:</strong> {job.assignedEngineerId}</p>
          
          {/* Update Status Button */}
          <button
            style={{
              backgroundColor: '#00796b', // Initial button color
              color: '#fff', // Text color for the button
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px', // Rounded button corners
              cursor: 'pointer', // Pointer cursor on hover
              fontWeight: 'bold', // Make the text bold
              transition: 'background-color 0.3s', // Smooth transition when background color changes
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#004d40'} // Darken the button color on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = '#00796b'} // Reset the button color on mouse leave
          >
            Update Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;

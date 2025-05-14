import React, { useState, useEffect, useMemo } from 'react';

const JobsPage = () => {
  // State for jobs list and filter criteria
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    shipId: '',
    status: '',
    priority: ''
  });

  // Fetch jobs from localStorage on component mount
  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(allJobs);
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Update job status in the list and persist to localStorage
  const updateJobStatus = (id, newStatus) => {
    const updatedJobs = jobs.map(job =>
      job.id === id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  // Memoized filtering function for better performance on large datasets
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        (filters.shipId === '' || job.shipId === filters.shipId) &&
        (filters.status === '' || job.status === filters.status) &&
        (filters.priority === '' || job.priority === filters.priority)
      );
    });
  }, [jobs, filters]);

  // Reset all filters
  const clearFilters = () => {
    setFilters({ shipId: '', status: '', priority: '' });
  };

  return (
    <div style={{ padding: '20px', background: '#f9f9f9' }}>
      <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px' }}>Jobs</h3>

      {/* Filter Controls */}
      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Ship:</label>
        <input
          type="text"
          name="shipId"
          value={filters.shipId}
          onChange={handleFilterChange}
          style={{ padding: '8px', margin: '0 10px 10px 10px', borderRadius: '5px' }}
          aria-label="Filter by Ship ID"
        />
        <label>Filter by Status:</label>
        <input
          type="text"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          style={{ padding: '8px', margin: '0 10px 10px 0', borderRadius: '5px' }}
          aria-label="Filter by Status"
        />
        <label>Filter by Priority:</label>
        <input
          type="text"
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          style={{ padding: '8px', marginBottom: '10px', borderRadius: '5px' }}
          aria-label="Filter by Priority"
        />
        <button
          onClick={clearFilters}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Display filtered jobs */}
      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        {filteredJobs.map((job) => (
          <li
            key={job.id}
            style={{
              backgroundColor: '#fff',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong>{job.type}</strong> - {job.status} - {job.priority} - {job.scheduledDate}

            {/* Conditional rendering based on job status */}
            {job.status !== 'InProgress' && (
              <button
                onClick={() => updateJobStatus(job.id, 'InProgress')}
                style={{
                  marginLeft: '10px',
                  padding: '6px 12px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Mark as In Progress
              </button>
            )}

            {job.status === 'InProgress' && (
              <button
                onClick={() => updateJobStatus(job.id, 'Completed')}
                style={{
                  marginLeft: '10px',
                  padding: '6px 12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsPage;

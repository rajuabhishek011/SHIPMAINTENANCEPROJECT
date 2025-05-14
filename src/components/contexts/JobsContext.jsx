import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to manage maintenance jobs
const JobsContext = createContext();

// Custom hook to access the jobs context from any component
export const useJobs = () => {
  return useContext(JobsContext);
};

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Load jobs from localStorage when the component mounts
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  // Function to add a new job
  const addJob = (newJob) => {
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Persist jobs
  };

  // Function to update the status of a job by ID
  const updateJobStatus = (jobId, status) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Persist updates
  };

  // Provide job data and job-related actions to consuming components
  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJobStatus }}>
      {children}
    </JobsContext.Provider>
  );
};

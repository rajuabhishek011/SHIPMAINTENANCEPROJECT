import  { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const JobCalendar = () => {
  // State to keep track of the selected date
  const [jobs, setjobs] = useState([])
  // console.log({jobs})

  const [date, setDate] = useState(new Date());
  
  // State to store jobs that are scheduled for the selected date
  const [selectedJobs, setSelectedJobs] = useState([]);

  useEffect(()=>{
     const arr = JSON.parse(localStorage.getItem("jobs"))
      setjobs(arr)
      
console.log(arr, jobs)

  },[])
  // Function to handle when a date is selected from the calendar
  const handleDateChange = (date) => {
    setDate(date); // Set the selected date

    // Convert the selected date to ISO string and remove time to get the date in YYYY-MM-DD format
    const selectedDateStr = date.toISOString().split('T')[0];

    // Filter the jobs that have the same scheduled date as the selected date
    const jobsForDate = jobs.filter((job) => job.scheduledDate === selectedDateStr);
    
    // Set the filtered jobs into the selectedJobs state
    setSelectedJobs(jobsForDate);
  };

  // Function to check if there are any jobs scheduled on a particular date
  const hasJobs = (date) => {
    const dateStr = date.toISOString().split('T')[0]; // Convert date to string (YYYY-MM-DD)
    
    // Check if any job's scheduled date matches the selected date
    return jobs.some((job) => job.scheduledDate === dateStr);
  };

  // Function to render content on the tiles (days) of the calendar
  const renderTileContent = ({ date, view }) => {
    if (view === 'month' && hasJobs(date)) {
      // If there are jobs for this date, render a small dot on the tile
      return (
        <div
          style={{
            marginTop: '2px',
            width: '8px', // Small circle dot
            height: '8px',
            borderRadius: '50%', // Make it circular
            backgroundColor: '#ff7043', // Orange color
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      );
    }
    return null; // No content to render if no jobs for that date
  };

  return (
    <div style={{ padding: '20px', background: '#f4f4f9', borderRadius: '8px' }}>
      {/* Render the calendar component */}
      <Calendar
        onChange={handleDateChange} // Set the callback for when a date is selected
        value={date} // Set the selected date
        tileContent={renderTileContent} // Render the dot for dates with jobs
        style={{
          maxWidth: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Styling for the calendar
        }}
      />
      
      <div style={{ marginTop: '20px' }}>
        {/* Display the list of jobs for the selected date */}
        <h4 style={{ color: '#333', fontSize: '1.2rem', fontWeight: '600' }}>
          Jobs for {date.toLocaleDateString()} {/* Display selected date */}
        </h4>

        {/* List the jobs scheduled for the selected date */}
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {selectedJobs.map((job) => (
            <li
              key={job.id}
              style={{
                backgroundColor: '#ffffff',
                padding: '12px',
                marginBottom: '12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease', // Transition effect when hovering
              }}
            >
              {/* Display job details */}
              <strong style={{ color: '#333' }}>{job.type}</strong> - {job.priority} - {job.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobCalendar;

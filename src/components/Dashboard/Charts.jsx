import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Simulated input data for the number of jobs in progress and completed
const jobsInProgress = 0;  // Example: No jobs in progress
const jobsCompleted = 0;   // Example: No jobs completed

// Check if both job categories have a value of 0
const isEmpty = jobsInProgress === 0 && jobsCompleted === 0;

// Define chart data based on whether there are jobs or not
const data = isEmpty
  ? {
      labels: ['No Jobs Yet'],  // Label for the empty state
      datasets: [
        {
          label: 'Job Status',
          data: [1],  // Single entry to represent the "No Jobs Yet" state
          backgroundColor: ['#e0e0e0'], // Grey color for empty state
          borderColor: '#ffffff',  // White border color
          borderWidth: 2,  // Border width of 2px
        },
      ],
    }
  : {
      labels: ['Jobs In Progress', 'Jobs Completed'],  // Labels for the chart
      datasets: [
        {
          label: 'Job Status',  // Title for the dataset
          data: [jobsInProgress, jobsCompleted],  // Data points for jobs in progress and completed
          backgroundColor: ['#42a5f5', '#66bb6a'],  // Blue for "In Progress", Green for "Completed"
          borderColor: '#ffffff',  // White border around each slice
          borderWidth: 2,  // Border width of 2px
        },
      ],
    };

// Chart options to control appearance and behavior
const options = {
  responsive: true,  // Makes the chart responsive to window resizing
  plugins: {
    legend: {
      position: 'top',  // Position the legend at the top of the chart
      labels: {
        color: '#333',  // Dark gray color for legend labels
      },
    },
    title: {
      display: true,  // Display the chart title
      text: 'Job Status Overview',  // Title of the chart
      font: {
        size: 18,  // Font size of the title
        weight: 'bold',  // Bold font weight for title
      },
      color: '#333',  // Dark gray color for the title
    },
  },
};

const JobStatusChart = () => {
  return (
    <div
      style={{
        maxWidth: '500px',  // Maximum width of the chart container
        margin: '30px auto',  // Center the container horizontally with top margin
        padding: '20px',  // Padding around the chart
        backgroundColor: '#f9f9f9',  // Light background color for the container
        borderRadius: '12px',  // Rounded corners for the container
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',  // Subtle shadow effect
      }}
    >
      {/* Render Pie chart with the defined data and options */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default JobStatusChart;

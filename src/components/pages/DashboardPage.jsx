import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  // States to store the data for total ships, overdue components, jobs in progress, and jobs completed
  const [totalShips, setTotalShips] = useState(0);
  const [overdueComponents, setOverdueComponents] = useState(0);
  const [jobsInProgress, setJobsInProgress] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const ships = JSON.parse(localStorage.getItem('ships')) || [];
    const components = JSON.parse(localStorage.getItem('components')) || [];
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Set total ships
    setTotalShips(ships.length);

    // Calculate overdue components
    const overdueCount = components.filter(comp => new Date(comp.lastMaintenanceDate) < new Date()).length;
    setOverdueComponents(overdueCount);

    // Set jobs in progress and jobs completed
    setJobsInProgress(jobs.filter(job => job.status === 'InProgress').length);
    setJobsCompleted(jobs.filter(job => job.status === 'Completed').length);
  }, []); // Empty dependency array to run only once on component mount

  // Determine if there are any jobs in progress or completed
  const isEmpty = jobsInProgress === 0 && jobsCompleted === 0;

  // Prepare data for Pie chart based on jobs status
  const chartData = isEmpty
    ? {
        labels: ['No Jobs Yet'],
        datasets: [
          {
            label: 'Job Status',
            data: [1],
            backgroundColor: ['#bdc3c7'], // Gray color when there are no jobs
            borderColor: ['#ffffff'],
            borderWidth: 1,
          },
        ],
      }
    : {
        labels: ['Jobs In Progress', 'Jobs Completed'],
        datasets: [
          {
            label: 'Job Status',
            data: [jobsInProgress, jobsCompleted],
            backgroundColor: ['#3498db', '#2ecc71'], // Blue for In Progress, Green for Completed
            borderColor: ['#2980b9', '#27ae60'],
            borderWidth: 1,
          },
        ],
      };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
        labels: {
          color: '#2c3e50', // Legend text color
        },
      },
      title: {
        display: true,
        text: isEmpty ? 'No Jobs Available' : 'Job Status Overview', // Conditional title based on job availability
        color: '#2c3e50',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return isEmpty ? 'No jobs yet' : `${context.label}: ${context.parsed}`; // Customize tooltip text
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(to right, #f0f4f8, #ffffff)', // Gradient background
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '1100px', // Set max width of the dashboard container
          margin: '0 auto',
          background: '#ffffff', // White background for the content
          padding: '30px',
          borderRadius: '10px', // Rounded corners for the dashboard box
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow effect
        }}
      >
        <h2 style={{ color: '#2c3e50', fontSize: '2rem', marginBottom: '30px' }}>
          Dashboard
        </h2>

        {/* Row of cards displaying stats */}
        <Row>
          {/* Total Ships Card */}
          <Col md={3}>
            <Card style={{ background: '#f5f6fa', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ color: '#2c3e50' }}>Total Ships</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', color: '#2c3e50' }}>
                  {totalShips}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Overdue Maintenance Card */}
          <Col md={3}>
            <Card style={{ background: '#f5f6fa', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ color: '#e74c3c' }}>Overdue Maintenance</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', color: '#e74c3c' }}>
                  {overdueComponents}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Jobs In Progress Card */}
          <Col md={3}>
            <Card style={{ background: '#f5f6fa', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ color: '#3498db' }}>Jobs In Progress</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', color: '#3498db' }}>
                  {jobsInProgress}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Jobs Completed Card */}
          <Col md={3}>
            <Card style={{ background: '#f5f6fa', padding: '20px' }}>
              <Card.Body>
                <Card.Title style={{ color: '#2ecc71' }}>Jobs Completed</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', color: '#2ecc71' }}>
                  {jobsCompleted}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pie chart displaying job status */}
        <div style={{ marginTop: '50px', height: '400px' }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

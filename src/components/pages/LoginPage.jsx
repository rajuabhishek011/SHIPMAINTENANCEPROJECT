// Import React and LoginForm component
import React from 'react';
import LoginForm from '../Authentication/LoginForm';

// Define the LoginPage component
const LoginPage = () => {
  return (
    <div
      className="login-page"
      style={{
        // Centering the page content using flexbox
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',  // Make the page take full viewport height
        background: 'linear-gradient(to right,rgb(45, 126, 161),rgb(44, 102, 132))',  // Set background gradient
        padding: '20px',
        boxSizing: 'border-box',  // Ensure padding doesn't affect the layout
      }}
    >
      <div
        style={{
          background: '#ffffff',  // White background for the login form
          borderRadius: '10px',  // Rounded corners
          padding: '30px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  // Add subtle shadow for depth
          width: '100%',
          maxWidth: '400px',  // Limit the width of the form
          textAlign: 'center',  // Center text in the form
        }}
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Login</h2> {/* Title for login */}
        <LoginForm />  {/* Render the LoginForm component */}
      </div>
    </div>
  );
};

// Export the LoginPage component for use in other parts of the app
export default LoginPage;

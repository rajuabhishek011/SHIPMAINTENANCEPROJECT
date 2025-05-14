import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom'; // Importing necessary components from react-router-dom
import { useAuth } from './contexts/AuthContext'; // Custom hook to manage authentication context

const NavBar = () => {
  // Destructure user and logout method from AuthContext
  const { user, logout } = useAuth();
  
  const navigate = useNavigate(); // hook for navigation
  if(!user) return null; // If no user is logged in, return null to avoid rendering the navbar
  // Handle logout function, which asks for confirmation and logs the user out if confirmed
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout(); // Call the logout function from the context
      navigate('/'); // Redirect to the homepage after logging out
    }
  };

  // Inline styles for the navigation bar container
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: '#404040',
    color: 'white',
    alignItems: 'center',
    flexWrap: 'wrap', // Ensures the navbar is responsive on smaller screens
  };

  // Inline styles for the links in the navigation bar
  const linkStyle = {
    color: 'white',
    margin: '0 12px',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  // Active link style for underline when a link is selected
  const activeLinkStyle = {
    textDecoration: 'underline',
  };

  return (
    <div style={navStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Render navigation links with conditional active styles */}
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/ships"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Ships
        </NavLink>
        <NavLink
          to="/jobs"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Jobs
        </NavLink>
        <NavLink
          to="/add-ship"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Add Ship
        </NavLink>
        <NavLink
          to="/add-job"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Add Job
        </NavLink>
        <NavLink
          to="/calendar"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Calendar
        </NavLink>
        <NavLink
          to="/notifications"
          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}
        >
          Notifications
        </NavLink>
      </div>
      <div>
        {/* If the user is logged in, show their email and logout button */}
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>{user.email}</span>
            <button
              onClick={handleLogout} // Trigger logout when clicked
              style={{
                background: 'white',
                color: '#007bff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // If no user is logged in, show a login link
          <Link to="/" style={linkStyle}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;

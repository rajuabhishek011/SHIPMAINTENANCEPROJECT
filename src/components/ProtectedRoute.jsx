import { Navigate } from 'react-router-dom'; // Import Navigate for redirecting users to other routes
import { useAuth } from './contexts/AuthContext'; // Custom hook to access authentication context (user and their role)

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth(); // Extract the current user from the authentication context

  // Style for when access is denied due to insufficient permissions
  const accessDeniedStyle = {
    padding: '20px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #f5c6cb',
  };

  // Style for the redirect message if the user is not logged in
  const redirectToLoginStyle = {
    padding: '20px',
    backgroundColor: '#cce5ff',
    color: '#004085',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #b8daff',
  };

  // If the user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/" />; // Redirect to the login page
  }

  // If the user is logged in but does not have the required role, show an access denied message
  if (!allowedRoles.includes(user.role)) {
    return <div style={accessDeniedStyle}>❌ Access Denied: You don’t have permission to view this page.</div>;
  }

  // If the user is logged in and has the required role, render the children components (i.e., protected content)
  return children;
};

export default ProtectedRoute;

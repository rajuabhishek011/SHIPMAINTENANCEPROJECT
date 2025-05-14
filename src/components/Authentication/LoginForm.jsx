import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  // Local state for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get the setUser function from custom Auth context
  const { setUser } = useAuth();

  // Hook to navigate programmatically after login
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve hardcoded users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check for matching credentials
    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store the logged-in user in Auth context and localStorage
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Redirect to dashboard on successful login
      navigate('/dashboard');
    } else {
      // Show error if credentials are invalid
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="login-form"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #dbeafe, #e0e7ff)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#1e293b',
          }}
        >
          Login
        </h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '1rem',
          }}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '1rem',
          }}
        />

        {/* Display error message if login fails */}
        {error && (
          <p
            className="error"
            style={{
              color: '#dc2626',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error}
          </p>
        )}

        {/* Submit button with hover effect */}
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = '#2563eb')
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = '#3b82f6')
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

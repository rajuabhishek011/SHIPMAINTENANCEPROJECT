import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a new context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage to persist session across reloads
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
//const nav = useNavigate();
  // Login function: checks credentials against localStorage-stored users
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser)); // Persist logged-in user
      return true;
    }
    return false;
  };

  // Logout function: clears current user from state and localStorage
  const logout = () => {

    setUser(null);
    // navigator("/") -- commented out; navigation handled elsewhere if needed
    localStorage.removeItem('user');
    //nav("/"); // Redirect to home page after logout
  };

  // Boolean flag for checking if a user is logged in
  const isAuthenticated = !!user;

  // Provide auth-related values and functions to the app
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout ,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';

// Create a context for notifications
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Local state to hold all active notifications
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(), // Unique ID based on current timestamp
      message,        // Message content passed in
    };
    // Add the new notification to the existing list
    setNotifications((prev) => [...prev, newNotification]);
  };

  // Function to dismiss (remove) a notification by ID
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Provide the notifications state and functions to consumers
  return (
    <NotificationContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the NotificationContext in other components
export const useNotification = () => useContext(NotificationContext);

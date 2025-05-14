import React, { useState } from 'react';

const NotificationCenter = () => {
  // State to hold notifications
  const [notifications, setNotifications] = useState([]); // Start with no notifications

  // Function to dismiss a notification by its ID
  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id)); // Remove notification with matching ID
  };

  return (
    <div
      className="notification-center"
      style={{
        display: 'flex', // Flexbox layout to center the notifications
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh', // Minimum height of the container
        flexDirection: 'column', // Stack the notifications vertically
      }}
    >
      {notifications.length === 0 ? (
        // If there are no notifications, show this message
        <div
          style={{
            backgroundColor: '#f8f9fa', // Light background color
            color: '#2c3e50', // Text color
            padding: '20px 40px', // Padding inside the box
            borderRadius: '12px', // Rounded corners
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)', // Soft shadow effect
            fontSize: '18px', // Font size
            fontWeight: 'bold', // Make the font bold
            textAlign: 'center', // Center the text
          }}
        >
          There are no notifications for you as of now.
        </div>
      ) : (
        // If there are notifications, map over them and display each
        notifications.map((notification) => (
          <div
            key={notification.id} // Unique key for each notification
            style={{
              backgroundColor: notification.type === 'info' ? '#cce5ff' : '#fff3cd', // Set background color based on type
              color: notification.type === 'info' ? '#004085' : '#856404', // Set text color based on type
              padding: '20px 40px', // Padding inside the notification box
              borderRadius: '12px', // Rounded corners
              fontWeight: 'bold', // Bold text
              fontSize: '18px', // Font size
              marginBottom: '16px', // Space between notifications
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)', // Shadow effect
              textAlign: 'center', // Center the text inside the notification
            }}
          >
            {notification.message} {/* Display the message */}
            <div>
              {/* Dismiss button */}
              <button
                onClick={() => dismissNotification(notification.id)} // Call dismiss function on click
                style={{
                  marginTop: '10px', // Space above the button
                  background: '#eee', // Background color of the button
                  border: 'none', // Remove border
                  padding: '6px 12px', // Padding inside the button
                  borderRadius: '6px', // Rounded corners for the button
                  cursor: 'pointer', // Pointer cursor on hover
                  fontWeight: 'bold', // Make the text bold
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationCenter;

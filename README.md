# Ship Management Application

A web application for managing ships, components, jobs, and notifications. The app is built using React, Context API, and `react-router-dom` for routing. It includes role-based authentication, allowing users with different roles (Admin, Inspector, Engineer) to access different pages and features.

## Features

- **Authentication:** Users can log in with different roles:
  - Admin
  - Inspector
  - Engineer
- **Role-based Access Control:** Only users with the appropriate role can access certain pages and actions.
- **Ship Management:** Add, update, and view ship details.
- **Component Management:** Manage components associated with ships.
- **Job Management:** Assign and manage jobs for different ships and components.
- **Job Calendar:** View scheduled jobs in a calendar view.
- **Notifications:** A notification center for updates and alerts.

## Tech Stack

- **Frontend:**
  - React
  - React Router
  - Context API
  - React Toastify for notifications
- **State Management:**
  - React Context API
  - LocalStorage for data persistence
- **Styling:**
  - Inline CSS for basic styles

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ship-management-app.git
   cd ship-management-app
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   This will run the app on `http://localhost:3000`.

## Local Storage Data

The app uses `localStorage` to persist data across sessions. The following data is initially pre-filled in `localStorage`:

* **Ships** (Ships with IDs and details like name, IMO, flag, and status)
* **Users** (Users with roles: Admin, Inspector, Engineer)
* **Components** (Components related to ships)
* **Jobs** (Jobs related to ships and components)

## File Structure

```
/src
  /components
    /contexts          # Context providers for managing authentication and ships
    /pages             # Pages for the application (Dashboard, Ships, Jobs, etc.)
    /Ships             # Components and forms related to ships
    /Jobs              # Components and forms related to jobs
    /Notifications     # Notification center and notifications-related components
    /Components        # Components for managing ship components
  /utils
    - LocalStorageUtils.js  # Helper functions for interacting with localStorage
  - App.js               # Main entry point of the app
  - index.js             # ReactDOM entry point
```

## Role-based Access Control

* **Admin**: Has access to all features (Dashboard, Ships, Jobs, Components).
* **Inspector**: Can view ships, components, and jobs, but cannot modify them.
* **Engineer**: Can view jobs and components, but cannot modify ships or components.

## Protected Routes

The app utilizes a **ProtectedRoute** component to ensure that users can only access routes that match their role. If a user tries to access a page they are not authorized for, they will be redirected or shown an access-denied message.

## Notes

* You can simulate login with users:

  * **Admin**: `admin@entnt.in`, password: `admin123`
  * **Inspector**: `inspector@entnt.in`, password: `inspect123`
  * **Engineer**: `engineer@entnt.in`, password: `engine123`

* All data (ships, jobs, components, users) are stored in `localStorage`, which means that it persists between page reloads but does not get shared across different machines or browsers.

## Contributing

If you'd like to contribute to this project, feel free to fork it, make changes, and create a pull request. Any feedback or suggestions are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import { ShipsProvider } from './components/contexts/ShipsContext';
import { NotificationProvider } from './components/contexts/NotificationContext'; 
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import JobsPage from './components/pages/JobsPage';
import ShipDetailPage from './components/pages/ShipDetailPage';
import ShipsPage from './components/pages/ShipsPage';
import ShipForm from './components/Ships/ShipForm';
import JobForm from './components/Jobs/JobForm';
import NotificationCenter from './components/Notifications/NotificationCenter';
import JobCalendar from './components/Jobs/JobCalendar';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import { saveToLocalStorage } from './components/utils/LocalStorageUtils';
import ComponentForm from './components/Components/ComponentForm';  
import { useState} from 'react'; // Importing useState for managing state in functional components

const App = () => {
  // useEffect hook to initialize localStorage with default data if not already present

 
  useEffect(() => {
    // Check and initialize jobs data in localStorage
    if (!localStorage.getItem("jobs")) {
      saveToLocalStorage("jobs", [
        {
          id: "j1",
          componentId: "c1",
          shipId: "s1",
          type: "Inspection",
          priority: "High",
          status: "Open",
          assignedEngineerId: "3",
          scheduledDate: "2025-05-05"
        }
      ]);
    }

    // Check and initialize ships data in localStorage
    if (!localStorage.getItem("ships")) {
      saveToLocalStorage("ships", [
        { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
        { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "UnderMaintenance" }
      ]);
    }

    // Check and initialize users data in localStorage
    if (!localStorage.getItem("users")) {
      saveToLocalStorage("users", [
        { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
        { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
        { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" }
      ]);
    }

    // Check and initialize components data in localStorage
    if (!localStorage.getItem("components")) {
      saveToLocalStorage("components", [
        {
          id: "c1",
          shipId: "s1",
          name: "Main Engine",
          serialNumber: "ME-1234",
          installDate: "2020-01-10",
          lastMaintenanceDate: "2024-03-12"

        },
        {
          id: "c2",
          shipId: "s2",
          name: "Radar",
          serialNumber: "RAD-5678",
          installDate: "2021-07-18",
          lastMaintenanceDate: "2023-12-01"
        }
      ]);

    

    }
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  return (
    <AuthProvider>
      <ShipsProvider>
        <NotificationProvider> {/* NotificationProvider wraps the whole app to manage notifications */}
          <Router>
            <NavBar /> {/* Navigation Bar component */}

            <Routes>
              {/* Define route for login page */}
              <Route path="/" element={<LoginPage />} />

              {/* Protected route for dashboard, only accessible by Admin, Inspector, and Engineer */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Inspector', 'Engineer']}>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for ships listing, only accessible by Admin and Inspector */}
              <Route
                path="/ships"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                    <ShipsPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for individual ship details, only accessible by Admin and Inspector */}
              <Route
                path="/ships/:id"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                    <ShipDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for adding a new ship, only accessible by Admin */}
              <Route
                path="/add-ship"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <ShipForm onSubmit={() => {}} />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for editing an existing ship, only accessible by Admin */}
              <Route
                path="/ships/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <ShipForm onSubmit={() => {}} />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for adding a new component to a ship, only accessible by Admin and Inspector */}
              <Route
                path="/components/add/:id"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                    <ComponentForm />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for editing an existing component, only accessible by Admin and Inspector */}
              <Route
                path="/components/edit/:id/:componentId"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                    <ComponentForm />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for jobs listing, only accessible by Admin and Engineer */}
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Engineer']}>
                    <JobsPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for adding a new job, only accessible by Admin */}
              <Route
                path="/add-job"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <JobForm onSubmit={() => {}} />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for job calendar, accessible by Admin, Engineer, and Inspector */}
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Engineer', 'Inspector']}>
                    <JobCalendar  />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for notifications center, accessible by Admin, Engineer, and Inspector */}
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Engineer', 'Inspector']}>
                    <NotificationCenter /> {/* Notification center to manage notifications */}
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </NotificationProvider> {/* Closing NotificationProvider */}
      </ShipsProvider> {/* Closing ShipsProvider */}
    </AuthProvider> 
  );
};

export default App;

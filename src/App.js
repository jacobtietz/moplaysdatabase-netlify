import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ResetPassword";
import ResetPassword from "./pages/PwrRes";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Privacy from "./pages/Privacy";
import DMCA from "./pages/DMCA";
import Contact from "./pages/Contact";
import ContactThem from "./pages/ContactThem"; // <-- new page
import PlaySearch from "./pages/PlaySearch";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreatePlay from "./pages/CreatePlay";
import EditPlay from "./pages/EditPlay";

import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <TopBar />
        <div className="content">
          <Routes>
            {/* Auth routes */}
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Legal */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/contact/:id"
              element={
                <PrivateRoute>
                  <ContactThem />
                </PrivateRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/plays"
              element={
                <PrivateRoute>
                  <PlaySearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/plays/page/:page"
              element={
                <PrivateRoute>
                  <PlaySearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-play/:id"
              element={
                <PrivateRoute>
                  <EditPlay />
                </PrivateRoute>
              }
            />
            <Route
              path="/plays/create"
              element={
                <PrivateRoute>
                  <CreatePlay />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />

            {/* Default */}
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
        </div>
        <BottomBar />
      </div>
    </Router>
  );
}

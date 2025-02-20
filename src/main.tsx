/**
 * @fileoverview Main application entry point
 * @module Main
 */

import { Home } from "@pages/Home";
import { Profile } from "@pages/Profile";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.scss";

/**
 * Renders the main application
 * Sets up React Router for navigation between pages
 * Includes routes for:
 * - Home page ('/')
 * - User profile page ('/profile/:id')
 * - Fallback route redirecting to home
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

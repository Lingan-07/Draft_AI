import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import UserDashboard from "../pages/dashboard/UserDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import CreateDraft from "../pages/draft/CreateDraft";
import DraftPreview from "../pages/draft/DraftPreview";
import DraftHistory from "../pages/draft/DraftHistory";

import TemplateList from "../pages/template/TemplateList";
import TemplateForm from "../pages/template/TemplateForm";

import Profile from "../pages/profile/Profile";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* User Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drafts/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CreateDraft />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drafts/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DraftPreview />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drafts/:id/history"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DraftHistory />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TemplateList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/templates/new"
        element={
          <AdminRoute>
            <DashboardLayout>
              <TemplateForm />
            </DashboardLayout>
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { isAuthenticated } from "../utils/auth";
import Layout from "../components/layout/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import StudentDetails from "../pages/StudentDetails";
import StudentRegistration from "../pages/StudentRegistration";
import StudentEdit from "../pages/StudentEdit";
import Courses from "../pages/Courses";
import CourseCreate from "../pages/CourseCreate";
import CourseDetails from "../pages/CourseDetails";
import CourseEdit from "../pages/CourseEdit";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Payments from "../pages/Payments";
import Invoice from "../components/invoice/Invoice";
import Certificate from "../components/certificate/Certificate";
import Signup from "../pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard if authenticated, otherwise to login */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="students/:id"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="students/:id/edit"
          element={
            <ProtectedRoute>
              <StudentEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="students/new"
          element={
            <ProtectedRoute>
              <StudentRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses/:id/edit"
          element={
            <ProtectedRoute>
              <CourseEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses/new"
          element={
            <ProtectedRoute>
              <CourseCreate />
            </ProtectedRoute>
          }
        />
   
        <Route
          path="notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Direct dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      {/* Direct routes for all admin pages */}
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Students />} />
        <Route path=":id" element={<StudentDetails />} />
        <Route path=":id/invoice" element={<Invoice />} />
        <Route path=":id/certificate" element={<Certificate />} />
        <Route path=":id/edit" element={<StudentEdit />} />
      </Route>
      <Route
        path="/new-registration"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentRegistration />} />
      </Route>

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Courses />} />
        <Route path=":id" element={<CourseDetails />} />
        <Route path=":id/edit" element={<CourseEdit />} />
      </Route>
      <Route
        path="/create-course"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CourseCreate />} />
      </Route>

      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
      </Route>

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Notifications />} />
      </Route>

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Payments />} />
      </Route>

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
      <Route index element={<Settings/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

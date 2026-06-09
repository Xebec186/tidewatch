import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThingsBoardProvider } from "./context/ThingsBoardContext";

// Standard imports for core landing and static pages (better SEO/initial paint)
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactSupport from "./pages/ContactSupport";
import ProfilePage from "./pages/ProfilePage";

import "./App.css";

// Lazy load larger/authenticated modules
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const MainDashboard = lazy(() => import("./pages/dashboard/MainDashboard"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThingsBoardProvider>
          <Suspense
            fallback={
              <div className="flex h-screen w-full items-center justify-center bg-surface">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            }
          >
            <Routes>
              {/* Public Routes with Main Navbar */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
              </Route>

              {/* Auth Routes - Lazy Loaded */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              {/* Dashboard Route - Lazy Loaded for security and bundle size */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<MainDashboard />} />
                </Route>
              </Route>

              {/* Simple Routes - Standard Imports */}
              <Route element={<SimpleLayout />}>
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/support" element={<ContactSupport />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </Suspense>
        </ThingsBoardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

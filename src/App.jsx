import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThingsBoardProvider } from "./context/ThingsBoardContext";
import "./App.css";

// Lazy load page components
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardRouter = lazy(() => import("./pages/dashboard/DashboardRouter"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));

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
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
              </Route>

              <Route element={<SimpleLayout />}>
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/support" element={<ContactSupport />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardRouter />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
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

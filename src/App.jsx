import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LandingPage from "./pages/LandingPage";
import RegularUserDashboard from "./pages/RegularUserDashboard";
import TechincalUserDashboard from "./pages/TechincalUserDashboard";
import "./App.css";

// placeholder pages for now
const Dashboard = () => <div className="p-6">Dashboard</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/technical-dashboard"
            element={<TechincalUserDashboard />}
          />
          <Route path="/regular-dashboard" element={<RegularUserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import EligibilityForm from "./components/EligibilityForm";
import History from "./components/History";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import UserDashboard from "./pages/UserDashboard";

function Layout() {
  const location = useLocation();

  // Hide navbar on login & signup pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div style={{ paddingTop: "70px", fontFamily: "Arial" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check" element={<EligibilityForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/officer" element={<OfficerDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

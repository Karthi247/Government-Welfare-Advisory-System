import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EligibilityForm from "./components/EligibilityForm";
import History from "./components/History";
import Dashboard from "./components/Dashboard"; 

function App() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<EligibilityForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

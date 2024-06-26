import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProviderRegister from "./components/ProviderRegister";
import ConsumerRegister from "./components/ConsumerRegister";
import Navbar from "./components/Navbar";
import { EthProvider } from "./contexts/EthContext";
import About from "./components/About";
import Service from "./components/Service";
import ConsumerLogin from "./components/ConsumerLogin";
import ProviderLogin from "./components/ProviderLogin";
import UserDashboard from "./components/UserDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import LandingPage from "./components/LandingPage";
import Admin from "./components/Admin";
// import PaymentPage from "./components/UserDashboard/PaymentPage";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <EthProvider>
    <Router>
      <Navbar onSelect={handleRoleSelect} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register-provider" element={<ProviderRegister role={selectedRole} />} />
        <Route path="/register-consumer" element={<ConsumerRegister role={selectedRole} />} />
        <Route path="/consumer-login" element={<ConsumerLogin role={selectedRole} />} />
        <Route path="/provider-login" element={<ProviderLogin role={selectedRole} />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      
        <div id="App">
          <div>
            {/* Other content can be added here if needed */}
          </div>
        </div>
     
    </Router>
    </EthProvider>
  );
}

export default App;

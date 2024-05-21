// App.jsx
import React, { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import LandingPage from "./components/LandingPage";
import ProviderDashboard from "./components/ProviderDashboard";
import UserDashboard from "./components/UserDashboard";


function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  let content;
  if (selectedRole === 'provider') {
    content = <ProviderDashboard />;
  } else if (selectedRole === 'user') {
    content = <UserDashboard />;
  } else {
    content = <LandingPage onSelect={handleRoleSelect} />;
  }

  return (
    <EthProvider>
      <div id="App">
        <div > 
          {/* className="container" */}
          {content}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

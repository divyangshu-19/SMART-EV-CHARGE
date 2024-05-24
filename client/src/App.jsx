// App.jsx
import React, { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import LandingPage from "./components/LandingPage";
import ProviderDashboard from "./components/ProviderDashboard";
import UserDashboard from "./components/UserDashboard";
import LoginPage from "./components/LoginPage";


function App() {
  // const [selectedRole, setSelectedRole] = useState(null);

  const [selectedRole, setSelectedRole] = useState(null);
  const [loggedInRole, setLoggedInRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };


  const handleLogin = (role) => {
    setLoggedInRole(role);
  };


  // let content;
  // if (selectedRole === 'provider') {
  //   content = <ProviderDashboard />;
  // } else if (selectedRole === 'user') {
  //   content = <UserDashboard />;
  // } else {
  //   content = <LandingPage onSelect={handleRoleSelect} />;
  // }

  let content;
  if (loggedInRole === 'Provider') {
    content = <ProviderDashboard />;
  } else if (loggedInRole === 'user') {
    content = <UserDashboard />;
  } else if (selectedRole) {
    content = <LoginPage onLogin={handleLogin} role={selectedRole} />;
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

// App.jsx
import { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import LandingPage from "./components/LandingPage";
import ProviderDashboard from "./components/ProviderDashboard";
import UserDashboard from "./components/UserDashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loggedInRole, setLoggedInRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = (role) => {
    setLoggedInRole(role);
  };


 
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
        <Navbar onSelect={handleRoleSelect} />
        <div>
          {content}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

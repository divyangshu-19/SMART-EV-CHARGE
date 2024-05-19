// components/LandingPage.jsx
import React from 'react';

function LandingPage({ onSelect }) {
  return (
    <div className="landing-page">
      <h1>Welcome</h1>
      <button onClick={() => onSelect('provider')}>Be a Provider</button>
      <button onClick={() => onSelect('user')}>Be a User</button>
    </div>
  );
}

export default LandingPage;

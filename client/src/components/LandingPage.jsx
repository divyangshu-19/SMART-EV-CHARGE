// // components/LandingPage.jsx
// import React from 'react';
// import './Landing.css';

// function LandingPage({ onSelect }) {
//   return (
//     <div className="landing-page">
//       <h1>Welcome</h1>
//       <button onClick={() => onSelect('provider')}>Be a Provider</button>
//       <button onClick={() => onSelect('user')}>Be a User</button>
//     </div>
//   );
// }

// export default LandingPage;

import React from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Landing.css';

function LandingPage({ onSelect }) {
  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#home">EV Connect</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#login" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#login">Login</a>
                <a className="dropdown-item" href="#signup">Sign Up</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="home-page">
        <div className="dummy-text">
          <h1>Welcome to EV Connect</h1>
          <p>Please select your role to proceed:</p>
          <div>
            <button className="role-button" onClick={() => onSelect('provider')}>Provider</button>
            <button className="role-button" onClick={() => onSelect('user')}>User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;


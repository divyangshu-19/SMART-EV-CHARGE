import React from 'react';
import './Navbar.css';

const Navbar = ({ onSelect }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-navbar">
      <a className="navbar-brand" href="#home" style={{ color: 'black' }}>EV Connect</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#home" style={{ color: 'black' }}>Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about" style={{ color: 'black' }}>About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact" style={{ color: 'black' }}>Contact Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#services" style={{ color: 'black' }}>Services</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#login" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
              Login
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <button className="dropdown-item btn btn-link" onClick={() => onSelect('Consumer')}>Consumer</button>
              <button className="dropdown-item btn btn-link" onClick={() => onSelect('Provider')}>Provider</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
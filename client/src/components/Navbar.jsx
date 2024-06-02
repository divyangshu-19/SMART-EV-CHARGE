// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ onSelect }) => {
//   const handleRoleSelect = (role) => {
//     onSelect(role);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/" style={{ color: 'black' }}>EVConnect</Link>
//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link className="nav-link" to="/home" style={{ color: 'black' }}>Home</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/about" style={{ color: 'black' }}>About</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/service" style={{ color: 'black' }}>Service</Link>
//           </li>
//           <li className="nav-item dropdown">
//             <button className="nav-link dropdown-toggle btn btn-link" id="consumerDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
//               Consumer
//             </button>
//             <ul className="dropdown-menu" aria-labelledby="consumerDropdown">
//               <li><Link className="dropdown-item" to="/consumer-login">Login</Link></li>
//               <li><Link className="dropdown-item" to="/register">Register</Link></li>
//             </ul>
//           </li>
//           <li className="nav-item dropdown">
//             <button className="nav-link dropdown-toggle btn btn-link" id="providerDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
//               Provider
//             </button>
//             <ul className="dropdown-menu" aria-labelledby="providerDropdown">
//               <li><Link className="dropdown-item" to="/provider-login"  onClick={() => onSelect('user')}>Login</Link></li>
//               <li><Link className="dropdown-item" to="/register"  onClick={() => onSelect('Provider')}>Register</Link></li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;











// src/components/Navbar.js
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Import the CSS file

const Navbar = ({ onSelect }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/" style={{ color: 'white' }}>EVConnect</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={{ color: 'white' }}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" style={{ color: 'white' }}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/service" style={{ color: 'white' }}>Service</Link>
          </li>
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn btn-link" id="consumerDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
              Consumer
            </button>
            <ul className="dropdown-menu" aria-labelledby="consumerDropdown">
              <li>
                <Link className="dropdown-item" to="/consumer-login" onClick={() => onSelect('Consumer')}>Login</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/register">Register</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn btn-link" id="providerDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
              Provider
            </button>
            <ul className="dropdown-menu" aria-labelledby="providerDropdown">
              <li>
                <Link className="dropdown-item" to="/provider-login" onClick={() => onSelect('Provider')}>Login</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/register">Register</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;




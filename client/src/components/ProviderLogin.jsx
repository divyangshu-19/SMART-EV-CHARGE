// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProviderLogin = () => {
//   const handleLogin = (event) => {
//     event.preventDefault();
 
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card" style={{ width: '18rem' }}>
//         <div className="card-body">
//           <h5 className="card-title">Provider Login</h5>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Username" required />
//             </div>
//             <div className="mb-3">
//               <input type="password" className="form-control" placeholder="Password" required />
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//           <p className="mt-3">New here? <Link to="/register">Register</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProviderLogin;








// src/components/ProviderLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderLogin = ({ role }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here
    if (role === 'Provider') {
      navigate('/provider-dashboard');
    }
  };

  return (
    <div>
      <h2>Provider Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default ProviderLogin;






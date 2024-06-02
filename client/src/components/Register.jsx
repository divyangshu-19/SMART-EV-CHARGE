// import React from 'react';

// const Register = () => {
//   const handleRegister = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card" style={{ width: '18rem' }}>
//         <div className="card-body">
//           <h5 className="card-title">Register</h5>
//           <form onSubmit={handleRegister}>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Username" required />
//             </div>
//             <div className="mb-3">
//               <input type="email" className="form-control" placeholder="Email" required />
//             </div>
//             <div className="mb-3">
//               <input type="password" className="form-control" placeholder="Password" required />
//             </div>
//             <button type="submit" className="btn btn-primary">Register</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your registration logic here

    // On successful registration, navigate to another page
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;



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
import './LoginPage.css';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

function ProviderRegister ({ role }) {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log("Role: ", role);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!isRegistering) { // Check if it's not registering
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        setEmail(''); // Clear email field after registration
        setPassword(''); // Clear password field after registration
        setConfirmPassword(''); // Clear confirm password field after registration
        navigate('/provider-login');
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false); // Reset the registration state
      }
    }
  };

  return (
    <div className="login-page">
      <div className="card-login">
        <div className="card-body">
          <h1 className="card-title">Register as {role} </h1>
              <form onSubmit={handleRegistration}>
                <div className="form-group">
                  <label>Enter E-mail: <span className='text-danger'> *</span></label>
                  <input
                    type="email"
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Enter Password: <span className='text-danger'> *</span></label>
                  <input
                    type="password"
                    autoComplete='new-password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password: <span className='text-danger'> *</span></label>
                  <input
                    type="password"
                    autoComplete='off'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
                )}
                <button type="submit" disabled={isRegistering} className="btn btn-primary">Register</button>
              </form>
              <button onClick={() => navigate('/provider-login')} className="btn btn-link">Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegister;



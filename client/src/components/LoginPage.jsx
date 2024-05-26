import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin, role }) {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    onLogin(role === 'Consumer' ? 'user' : 'Provider');
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // Implement registration logic here
    setShowRegistration(false);
  };

  if (showRegistration) {
    return (
      <div className="login-page">
        <div className="card-login">
          <div className="card-body">
            <h1 className="card-title">Register as {role}</h1>
            <form onSubmit={handleRegistration}>
              {/* Registration form fields */}
              <div className="form-group">
                <label>Enter User Name: <span className='text-danger'> *</span></label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Enter E-mail: <span className='text-danger'> *</span></label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Enter Password: <span className='text-danger'> *</span></label>
                <input type="password" className="form-control" required />
              </div>
             <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <button onClick={() => setShowRegistration(false)} className="btn btn-link">Back to Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="card-login">
        <div className="card-body">
          <h1 className="card-title">Login as {role}</h1>
          <form onSubmit={handleLogin}>
            {/* Login form fields */}
            <div className="form-group">
              <label>Enter User Name: <span className='text-danger'> *</span> </label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Enter Password: <span className='text-danger'> *</span> </label>
              <input type="password" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
                
          </form>
          <span className="form-tex" > Don't have an account ? <button onClick={() => setShowRegistration(true)} className="btn btn-link">Register</button> </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
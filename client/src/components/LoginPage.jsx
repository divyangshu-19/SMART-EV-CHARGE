import React, { useState } from 'react';
import './LoginPage.css';
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from './firebase/auth';
import { useAuth } from '../contexts/authContext';
import { Navigate, Link, useNavigate } from 'react-router-dom'

function LoginPage({ onLogin, role }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false);
  
  const {userLoggedIn} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      setIsSigningIn(true)
      await doSignInWithEmailAndPassword(email, password)
      // doSendEmailVerification()
  }
    // Implement login logic here
    onLogin(role === 'Consumer' ? 'user' : 'Provider');
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if(!showRegistration) {
      setShowRegistration(true)
      await doCreateUserWithEmailAndPassword(email, password)
  }
    // Implement registration logic here
    // setShowRegistration(false);
  };

  if (showRegistration) {
    return (
      <>
        {userLoggedIn && (<Navigate to={'/LandingPage'} replace={true} />)}
        <div className="login-page">
          <div className="card-login">
            <div className="card-body">
              <h1 className="card-title">Register as {role}</h1>
              <form onSubmit={handleRegistration}>
                {/* Registration form fields */}
                {/* <div className="form-group">
                  <label>Enter User Name: <span className='text-danger'> *</span></label>
                  <input type="text" className="form-control" required />
                </div> */}
                <div className="form-group">
                  <label>Enter E-mail: <span className='text-danger'> *</span></label>
                  <input 
                  type="email" 
                  autoComplete='email'
                  value={email} onChange={(e) => { setEmail(e.target.value) }}
                  className="form-control" 
                  required 
                  />
                </div>
                <div className="form-group">
                  <label>Enter Password: <span className='text-danger'> *</span></label>
                  <input 
                  disabled={showRegistration}
                  type="password" 
                  value={password} onChange={(e) => { setPassword(e.target.value) }}
                  className="form-control" 
                  required 
                  />
                </div>
              <button type="submit" disabled={showRegistration} className="btn btn-primary">Register</button>
              </form>
              <button onClick={() => setShowRegistration(false)} className="btn btn-link">Back to Login</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/LandingPage'} replace={true} />)}
      <div className="login-page">
        <div className="card-login">
          <div className="card-body">
            <h1 className="card-title">Login as {role}</h1>
            <form onSubmit={handleLogin}>
              {/* Login form fields */}
              <div className="form-group">
                <label>Enter Resistered E-mail: <span className='text-danger'> *</span></label>
                <input 
                type="email" 
                value={email} onChange={(e) => { setEmail(e.target.value) }} 
                autoComplete='email'
                className="form-control" 
                required />
              </div>
              <div className="form-group">
                <label>Enter Password: <span className='text-danger'> *</span> </label>
                <input 
                type="password" 
                value={password} onChange={(e) => { setPassword(e.target.value) }}
                className="form-control" 
                required />
              </div>
              <button type="submit" disabled={isSigningIn} className="btn btn-primary">Login</button>
                  
            </form>
            <span className="form-tex" > Don't have an account ? <button onClick={() => setShowRegistration(true)} className="btn btn-link">Register</button> </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
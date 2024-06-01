import React, { useState } from 'react';
import './LoginPage.css';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from '../firebase/auth';

function LoginPage({ onLogin, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        onLogin(role === 'Consumer' ? 'user' : 'Provider');
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        onLogin(role === 'Consumer' ? 'user' : 'Provider');
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        setIsRegistering(false); // Reset the registration state
        setEmail(''); // Clear email field after registration
        setPassword(''); // Clear password field after registration
        setConfirmPassword(''); // Clear confirm password field after registration
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="card-login">
        <div className="card-body">
          {isRegistering ? (
            <>
              <h1 className="card-title">Register as {role}</h1>
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
                <button type="submit" value={isRegistering} className="btn btn-primary">Register</button>
              </form>
              <button onClick={() => setIsRegistering(false)} className="btn btn-link">Back to Login</button>
            </>
          ) : (
            <>
              <h1 className="card-title">Login as {role}</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email ID: <span className='text-danger'> *</span></label>
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
                    autoComplete='current-password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
                )}
                <button type="submit" disabled={isSigningIn} className="btn btn-primary">Login</button>
              </form>
              <span className="form-text">Don't have an account? <button onClick={() => setIsRegistering(true)} className="btn btn-link">Register</button></span>
              <button
                onClick={onGoogleSignIn}
                className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}
                disabled={isSigningIn}>
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_17_40)">
                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {isSigningIn ? 'Signing In...' : 'Continue with Google'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

// src/components/Login.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <form className="login-form p-5">
        <h2 className="mb-4 Login-title text-center">Login to Your Accounts</h2>
        <p className='Login-suptitle'>Take control of your work schedule with Attend Guards!</p>
        <div className="input-group mb-3">
          <span className="input-group-text"><FaEnvelope /></span>
          <input type="email" className="form-control in" id="email" name="email" placeholder="Email" />
        </div>
        <div className="input-group mb-3" style={{marginTop:"38px"}}>  
          <span className="input-group-text"><FaLock /></span>
          <input type="password" className="form-control in" id="password" name="password" placeholder="Password" />
        </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <button type="submit" className="btn login-btn btn-primary w-100">Login</button>
      </div>
      </form>
    </div>
  );
}

export default Login;
